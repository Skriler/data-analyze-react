import React from 'react';
import { cn } from '@libs/utils/cn';

const cardClasses = `
  rounded-lg
  border
  bg-card
  text-card-foreground
  shadow-sm
`;

const cardHeaderClasses = `
  flex
  flex-col
  space-y-1.5
  p-6
`;

const cardTitleClasses = `
  text-2xl
  font-semibold
  leading-none
  tracking-tight
`;

const cardDescriptionClasses = `
  text-sm
  text-muted-foreground
`;

const cardContentClasses = `
  p-6
  pt-0
`;

const cardFooterClasses = `
  flex
  items-center
  p-6
  pt-0
`;

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardClasses, className)} {...props} />
));

Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardHeaderClasses, className)} {...props} />
));

CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardTitleClasses, className)} {...props} />
));

CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardDescriptionClasses, className)} {...props} />
));

CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardContentClasses, className)} {...props} />
));

CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(cardFooterClasses, className)} {...props} />
));

CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
