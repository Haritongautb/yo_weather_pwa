export const animationFunc = (isEven: boolean = false, when?: string) => ({
  hidden: {
    x: isEven ? -100 : 100,
    opacity: 0,
  },
  visible: (custom: number = 1) => ({
    x: 0,
    opacity: 1,
    transition: !!when
      ? {
          delay: custom * 0.2,
        }
      : { delay: custom * 0.2, when },
  }),
});
