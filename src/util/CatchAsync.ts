// eslint-disable-next-line @typescript-eslint/ban-types
export default function CatchAsync(fn: Function) {
  return (req: any, res: any, next: any) => {
    fn(req, res, next).catch((error: Error) => {
      console.log(error);
      next(error); // Pass the error to the next middleware
    });
  };
}
