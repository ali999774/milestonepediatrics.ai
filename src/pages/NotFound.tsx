import { SectionWrapper } from '../components/ui/SectionWrapper';
import { Button } from '../components/ui/Button';

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <SectionWrapper className="py-24 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-neutral-300 font-bold text-6xl mb-4">404</div>
      <h1 className="text-3xl lg:text-4xl font-semibold mb-6 text-neutral-800">Page not found</h1>
      <p className="text-lg text-neutral-600 mb-8 max-w-md">
        This page seems to have wandered off. Let's get you back.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </SectionWrapper>
  );
}
