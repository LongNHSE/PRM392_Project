// import {
//   BadRequestException,
//   Injectable,
//   ValidationPipe,
// } from '@nestjs/common';

// @Injectable()
// export class CustomValidationPipe extends ValidationPipe {
//   constructor() {
//     super({
//       exceptionFactory: (errors) => {
//         // Customize the error messages here
//         const formattedErrors = errors.map((error) => ({
//           field: error.property,
//           errors: Object.values(error.constraints),
//         }));
//         // const ctx = host.switchToHttp();

//         // const response = ctx.getResponse<Response>();

//         // Return a BadRequestException with your custom response
//         return response({
//           statusCode: 400,
//           error: 'Bad Request',
//           message: formattedErrors,
//         });
//       },
//     });
//   }
// }
