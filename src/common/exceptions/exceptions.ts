import { HttpException } from '@nestjs/common';

function createException(message: string, statusCode: number) {
  return new HttpException(message, statusCode);
}

const UserException = {
  InvalidUser: createException('Invalid User', 400),
  NoExistsUser: createException('No Exists User', 400),
};

const ItemException = {
  NoExistsItem: createException('No Exist Item', 400),
};

const ReservationException = {
  TransactionError: createException('Transaction Error', 400),
  NoExistsUserOrItem: createException('No Exist User Or Item', 400),
  NoExistsItemQuantity: createException('No Exist Item Quantity', 400),
};

const TransactionException = {};

const MockException = {};

export default {
  User: UserException,
  Item: ItemException,
  Reservation: ReservationException,
  Transaction: TransactionException,
  Mock: MockException,

  createException,
  createBadRequestException: (message: string) => createException(message, 400),
};
