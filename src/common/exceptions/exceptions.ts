import { HttpException } from '@nestjs/common';

function createException(message: string, statusCode: number) {
  return new HttpException(message, statusCode);
}

const UserException = {
  InvalidUser: createException('Invalid User', 400),
  NoExistsUser: createException('No Exists User', 400),
};

const ItemExeption = {
  InvalidIdToken: createException('Invalid ID Token', 400),
};

const ReservationExeption = {};

export default {
  User: UserException,
  Item: ItemExeption,
  Reservation: ReservationExeption,

  createException,
  createBadRequestException: (message: string) => createException(message, 400),
};
