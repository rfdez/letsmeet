import Order from '../../../../../src/Contexts/Shared/domain/Criteria/Order';
import OrderBy from '../../../../../src/Contexts/Shared/domain/Criteria/OrderBy';
import OrderType, { OrderTypes } from '../../../../../src/Contexts/Shared/domain/Criteria/OrderType';
import OrderByMother from './OrderByMother';

export default class OrderMother {
  static create(orderBy?: OrderBy, orderType?: OrderTypes): Order {
    return new Order(
      orderBy ?? OrderByMother.create(),
      orderType ? OrderType.fromValue(orderType) : OrderType.fromValue(this.random())
    );
  }

  static none(): Order {
    return Order.none();
  }

  private static random() {
    const values = Object.keys(OrderTypes);
    return values[Math.floor(Math.random() * values.length)];
  }
}
