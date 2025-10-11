import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const MaternalChildCTA = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Maternal & Child Care Hub</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Personalized guidance and support for one of life's most important journeys. Get tailored advice for a healthy pregnancy and a thriving child.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:gap-16 mt-12">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">For Expectant Mothers</CardTitle>
              <CardDescription>
                From probability checks to trimester-specific diet and wellness plans, start your journey here.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/maternal-care" passHref>
                <Button size="lg" className="w-full">Start Maternal Care Journey</Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">For Your Child's Health</CardTitle>
              <CardDescription>
                Get vaccination reminders, nutrition guides, and developmental milestone tracking for your little one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/child-care" passHref>
                <Button size="lg" className="w-full" variant="outline">Start Child Care Journey</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MaternalChildCTA;