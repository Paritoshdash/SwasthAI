// components/video-call-modal.tsx
'use client';

import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import { VideoCallProvider, useVideoCall } from './video-call-provider';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import type { IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';
import type { EnrichedDoctor } from '../lib/types';

// Define the props interface
interface VideoCallModalProps {
  doctor: EnrichedDoctor;
  isOpen: boolean;
  onClose: () => void;
}

// --- VIDEO PLAYER COMPONENT ---
const VideoPlayer = ({
  videoTrack,
  audioTrack,
  isLocal = false,
}: {
  videoTrack: any; // Using 'any' to avoid complex type issues
  audioTrack: any; // Using 'any' to avoid complex type issues
  isLocal?: boolean;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const playerRef = ref.current;
    if (playerRef && videoTrack) {
      videoTrack.play(playerRef, { mirror: isLocal });
    }
    if (audioTrack) {
      audioTrack.play();
    }
    return () => {
      videoTrack?.stop();
      audioTrack?.stop();
    };
  }, [videoTrack, audioTrack, isLocal]);

  return (
    <div
      ref={ref}
      className="relative w-full h-full bg-black rounded-lg overflow-hidden"
    />
  );
};

// --- FUNCTIONAL VIDEO CALL MODAL ---
function FunctionalVideoCallModal({ doctor, isOpen, onClose }: VideoCallModalProps) {
  const { leave, toggleCamera, toggleMic, isMicOn, isCameraOn, remoteUsers, localVideoTrack, joinState } = useVideoCall();
  const { toast } = useToast();

  const handleLeave = async () => {
    await leave();
    onClose();
    toast({
        title: "Call Ended",
        description: "Your video call has ended.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="sm:max-w-[80vw] w-full max-h-[90vh] p-0 border-0 bg-gray-900 text-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="sr-only">
          <div>Video call with {doctor.name}</div>
          <div>
            This is an active video call. Use the controls at the bottom to manage your call.
          </div>
        </div>

        {!joinState ? (
             <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                <p className="text-lg text-muted-foreground">Connecting...</p>
             </div>
        ) : (
             <div className="flex-1 relative p-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-primary">
                    <VideoPlayer videoTrack={localVideoTrack} audioTrack={null} isLocal />
                    <div className="absolute bottom-2 left-2 bg-black/70 p-1.5 rounded-md text-xs backdrop-blur-sm">You</div>
                    {!isMicOn && <MicOff className="absolute top-2 right-2 text-white h-5 w-5 bg-red-600/80 p-1 rounded-full"/>}
                </div>

                {remoteUsers.map((user: IAgoraRTCRemoteUser) => (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-muted-foreground/30" key={user.uid}>
                        <VideoPlayer 
                          videoTrack={user.videoTrack} 
                          audioTrack={user.audioTrack} 
                        />
                        <div className="absolute bottom-2 left-2 bg-black/70 p-1.5 rounded-md text-xs backdrop-blur-sm">{doctor.name}</div>
                        {!user.hasAudio && <MicOff className="absolute top-2 right-2 text-white h-5 w-5 bg-red-600/80 p-1 rounded-full"/>}
                    </div>
                ))}
             </div>
        )}

        <div className="w-full p-4 bg-black/30 flex justify-center items-center gap-4">
            <Button onClick={toggleMic} variant="secondary" size="icon" className={`h-14 w-14 rounded-full transition-all ${!isMicOn ? 'bg-red-500/80 hover:bg-red-500/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {isMicOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>
            <Button onClick={toggleCamera} variant="secondary" size="icon" className={`h-14 w-14 rounded-full transition-all ${!isCameraOn ? 'bg-red-500/80 hover:bg-red-500/90 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                {isCameraOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>
            <Button onClick={handleLeave} variant="destructive" size="icon" className="h-14 w-14 rounded-full bg-red-600 hover:bg-red-700 transition-all shadow-lg">
                <PhoneOff className="h-6 w-6" />
            </Button>
        </div>
      </div>
    </Dialog>
  );
}

// --- MODAL WRAPPER WITH PROVIDER ---
const VideoCallModal: React.FC<VideoCallModalProps> = ({ doctor, isOpen, onClose }) => {
    const channelName = `health-companion-call-${doctor.id}`;
    const AGORA_APP_ID = process.env.NEXT_PUBLIC_AGORA_APP_ID || "";

    if (!isOpen) return null;
    
    if (!AGORA_APP_ID) {
        console.error("Agora App ID is not set. Please add NEXT_PUBLIC_AGORA_APP_ID to your .env.local file.");
        return (
            <Dialog open={isOpen} onOpenChange={onClose}>
                <div>
                    <div>
                        <div>Configuration Error</div>
                        <div>
                            The Agora App ID is missing. The video call feature cannot be initialized. Please check the developer console for instructions.
                        </div>
                    </div>
                </div>
            </Dialog>
        );
    }

    return (
        <VideoCallProvider appId={AGORA_APP_ID} channelName={channelName}>
            <FunctionalVideoCallModal doctor={doctor} isOpen={isOpen} onClose={onClose} />
        </VideoCallProvider>
    );
};

export default VideoCallModal;