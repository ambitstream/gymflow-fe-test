export const fieldAnimation = (index: number) => ({
  initial: {
    opacity: 0,
    y: 12,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  transition: {
    duration: 0.25,
    delay: index * 0.2,
  },
});
