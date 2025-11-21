import connect from '@/lib/mongoose';
import Routine from '@/models/Routine';

async function seed() {
  await connect();
  await Routine.deleteMany({});
  const r = new Routine({
    title: 'Math Routine',
    daysOrder: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    periods: [
      { label: '1st Period', time: '09:00-09:50' },
      { label: '2nd Period', time: '09:50-10:40' },
      { label: '3rd Period', time: '10:40-11:30' },
      { label: '4th Period', time: '11:30-12:20' },
      { label: '5th Period', time: '12:20-01:10' },
      { label: 'Break', time: '01:10-01:40' },
      { label: '6th Period', time: '01:40-02:30' },
    ],
    cells: [
      {
        day: 'Sunday',
        periodIndex: 0,
        subject: 'Calculus-I (MN)',
        teacher: 'MN',
      },
      {
        day: 'Sunday',
        periodIndex: 1,
        subject: 'Linear Algebra (AR)',
        teacher: 'AR',
      },
      // ... add more following the image
    ],
  });
  await r.save();
  console.log('Seeded:', r._id);
  process.exit();
}
seed();
