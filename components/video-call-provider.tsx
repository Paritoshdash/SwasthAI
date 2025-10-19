// health-companion/components/video-call-provider.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AgoraRTC, {
  IAgoraRTCClient,
  IAgoraRTCRemoteUser,
  ICameraVideoTrack,
  IMicrophoneAudioTrack,
} from 'agora-rtc-sdk-ng';

// Define the shape of the context
interface VideoCallContextType {
  client: IAgoraRTCClient;
  localAudioTrack: IMicrophoneAudioTrack | null;
  localVideoTrack: ICameraVideoTrack | null;
  remoteUsers: IAgoraRTCRemoteUser[];
  joinState: boolean;
  leave: () => Promise<void>;
  toggleCamera: () => void;
  toggleMic: () => void;
  isMicOn: boolean;
  isCameraOn: boolean;
}

const VideoCallContext = createContext<VideoCallContextType | undefined>(undefined);

// Create the provider component
export const VideoCallProvider = ({
  children,
  appId,
  channelName,
}: {
  children: ReactNode;
  appId: string;
  channelName: string;
}) => {
  const [client, setClient] = useState<IAgoraRTCClient | null>(null);
  const [localAudioTrack, setLocalAudioTrack] = useState<IMicrophoneAudioTrack | null>(null);
  const [localVideoTrack, setLocalVideoTrack] = useState<ICameraVideoTrack | null>(null);
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  useEffect(() => {
    // Only initialize Agora client on the client side
    if (typeof window !== 'undefined') {
      const agoraClient = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
      setClient(agoraClient);
    }
  }, []);

  useEffect(() => {
    if (!client) return;

    const joinChannel = async () => {
      try {
        // Fetch the token from our API route
        const response = await fetch('/api/agora-token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ channelName }),
        });
        const { token } = await response.json();

        // Join the channel
        await client.join(appId, channelName, token, null);

        // Create and publish local tracks
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const videoTrack = await AgoraRTC.createCameraVideoTrack();
        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);
        await client.publish([audioTrack, videoTrack]);
        
        setJoinState(true);
      } catch (error) {
        console.error('Failed to join channel:', error);
      }
    };

    joinChannel();

    // Event listeners for remote users
    const handleUserPublished = async (user: IAgoraRTCRemoteUser, mediaType: 'audio' | 'video') => {
      await client.subscribe(user, mediaType);
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    const handleUserUnpublished = () => {
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    const handleUserJoined = () => {
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    const handleUserLeft = () => {
      setRemoteUsers(Array.from(client.remoteUsers));
    };

    client.on('user-published', handleUserPublished);
    client.on('user-unpublished', handleUserUnpublished);
    client.on('user-joined', handleUserJoined);
    client.on('user-left', handleUserLeft);

    return () => {
      client.off('user-published', handleUserPublished);
      client.off('user-unpublished', handleUserUnpublished);
      client.off('user-joined', handleUserJoined);
      client.off('user-left', handleUserLeft);
      leave();
    };
  }, [client, appId, channelName]);

  const leave = async () => {
    if (localAudioTrack) {
      localAudioTrack.close();
      setLocalAudioTrack(null);
    }
    if (localVideoTrack) {
      localVideoTrack.close();
      setLocalVideoTrack(null);
    }
    setJoinState(false);
    if (client) {
      await client.leave();
    }
  };

  const toggleCamera = () => {
    if (localVideoTrack) {
      localVideoTrack.setEnabled(!isCameraOn);
      setIsCameraOn(!isCameraOn);
    }
  };

  const toggleMic = () => {
    if (localAudioTrack) {
      localAudioTrack.setEnabled(!isMicOn);
      setIsMicOn(!isMicOn);
    }
  };

  // Don't render children until client is initialized to prevent SSR issues
  if (!client) {
    return <>{children}</>;
  }

  return (
    <VideoCallContext.Provider value={{ 
      client, 
      localAudioTrack, 
      localVideoTrack, 
      remoteUsers, 
      joinState, 
      leave, 
      toggleCamera, 
      toggleMic, 
      isMicOn, 
      isCameraOn 
    }}>
      {children}
    </VideoCallContext.Provider>
  );
};

// Custom hook to use the context
export const useVideoCall = () => {
  const context = useContext(VideoCallContext);
  if (context === undefined) {
    throw new Error('useVideoCall must be used within a VideoCallProvider');
  }
  return context;
};