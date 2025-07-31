import React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@libs/utils/cn';

const sliderClasses = `
  relative
  flex
  w-full
  touch-none
  select-none
  items-center
`;

const sliderTrackClasses = `
  relative
  h-2
  w-full
  grow
  overflow-hidden
  rounded-full
  bg-secondary
`;

const sliderRangeClasses = `
  absolute
  h-full
  bg-primary
`;

const sliderThumbClasses = `
  block
  h-5
  w-5
  rounded-full
  border-2
  border-primary
  bg-background
  ring-offset-background
  transition-colors
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-ring
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50
`;

export interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(sliderClasses, className)}
    {...props}
  >
    <SliderPrimitive.Track className={cn(sliderTrackClasses)}>
      <SliderPrimitive.Range className={cn(sliderRangeClasses)} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={cn(sliderThumbClasses)} />
  </SliderPrimitive.Root>
));

Slider.displayName = 'Slider';

export { Slider };
