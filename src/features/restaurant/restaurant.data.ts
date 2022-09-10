import { RestaurantDto } from './dtos/restaurant.dto';
import { faker } from '@faker-js/faker';
import { RestaurantMealType, RestaurantPriceRange } from './restaurant.enum';
import { AddressDto } from './dtos/address.dto';
import { OperationTimeDto } from './dtos/operation-time.dto';

export const restaurantData = (): RestaurantDto[] => {
  let res: RestaurantDto[] = [];
  for (let i = 0; i < 5; i++) {
    res.push(RestaurantFactory.randomRestaurant());
  }
  return res;
};

class RestaurantFactory {
  public static randomRestaurant = (): RestaurantDto => {
    const restaurantId = faker.datatype.number().toString();

    const randomAddress = (): AddressDto => {
      return {
        restaurantId: restaurantId,
        id: faker.datatype.number().toString(),
        address1: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.stateAbbr(),
        zipCode: faker.address.zipCode(),
      };
    };
    const restaurantSchedule = () => {
      const operationTime = () => {
        return {
          id: faker.datatype.number().toString(),
          restaurantId,
          startTime: `${this.randomNumber(6, 10)}:00`,
          endTime: `${this.randomNumber(19, 23)}:00`,
        };
      };

      const newOperationTime = operationTime();

      let operationTimes: OperationTimeDto[] = [];
      for (let i = 0; i < 7; i++) {
        operationTimes.push({
          ...newOperationTime,
          day: i,
        });
      }
      return operationTimes;
    };

    return {
      id: restaurantId,
      name: faker.company.name(),
      cuisine: faker.commerce.productName(),
      priceRange: this.randomEnum(RestaurantPriceRange),
      mealType: this.randomEnum(RestaurantMealType),
      address: randomAddress(),
      operationTimes: restaurantSchedule(),
    };
  };

  private static randomNumber = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min) + min);

  private static randomEnum = <T>(anEnum: T): T[keyof T] => {
    const enumValues = Object.keys(anEnum)
      .map((n) => Number.parseInt(n))
      .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return randomEnumValue;
  };
}
