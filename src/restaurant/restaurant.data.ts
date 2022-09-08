import { RestaurantDto } from './dtos/restaurant.dto';
import { faker } from '@faker-js/faker';
import { RestaurantMealType, RestaurantPrice } from './restaurant.enum';
import { AddressDto } from './dtos/address.dto';
import { OperationTimeDto } from './dtos/operation-time.dto';

export const restaurantData: RestaurantDto[] = [];

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}

const randomRestaurant = () => {
  const restaurantId = faker.datatype.uuid();

  const randomAddress = (): AddressDto => {
    return {
      restaurantId: restaurantId,
      id: faker.datatype.uuid(),
      address1: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zipCode: faker.address.zipCode(),
    };
  };
  const restaurantSchedule = () => {
    const operationTime = () => {
      return {
        id: faker.datatype.uuid(),
        restaurantId,
        startTime: randomNumber(6, 10),
        endTime: randomNumber(19, 23),
      };
    };

    let operationTimes: OperationTimeDto[] = [];
    for (let i = 0; i < 7; i++) {}
  };

  return {
    name: faker.company.name(),
    priceRange: randomEnum(RestaurantPrice),
    mealType: randomEnum(RestaurantMealType),
    address: randomAddress(),
  };
};

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min) + min);
