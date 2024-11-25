import { PrismaClient } from '@prisma/client';
import amenitiesData from '../data/amenities.json' assert { type: 'json' };
import bookingsData from '../data/bookings.json' assert { type: 'json' };
import hostsData from '../data/hosts.json' assert { type: 'json' };
import propertiesData from '../data/properties.json' assert { type: 'json' };
import reviewsData from '../data/reviews.json' assert { type: 'json' };
import usersData from '../data/users.json' assert { type: 'json' };

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] });

async function main() {
  const { amenities } = amenitiesData;
  const { bookings } = bookingsData;
  const { hosts } = hostsData;
  const { properties } = propertiesData;
  const { reviews } = reviewsData;
  const { users } = usersData;

  // Upsert Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Upsert Hosts
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: host,
    });
  }

  // Upsert Properties
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: property,
    });
  }

  // Upsert Bookings
  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: booking,
    });
  }

  // Upsert Reviews
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: review,
    });
  }

  // Upsert Amenities
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
