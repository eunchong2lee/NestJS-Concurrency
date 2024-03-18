import { HttpException } from '@nestjs/common';

function createException(message: string, statusCode: number) {
  return new HttpException(message, statusCode);
}

const UserException = {
  InvalidUser: createException('Invalid User', 400),
  NoExistsUser: createException('No Exists User', 400),
};

const ItemExeption = {
  NoExistsItem: createException('No Exist Item', 400),
};

const ReservationExeption = {
  TransactionError: createException('Transaction Error', 400),
  NoExistsUserOrItem: createException('No Exist User Or Item', 400),
  NoExistsItemQuantity: createException('No Exist Item Quantity', 400),
};

export default {
  User: UserException,
  Item: ItemExeption,
  Reservation: ReservationExeption,

  createException,
  createBadRequestException: (message: string) => createException(message, 400),
};
