import RoutineGrid from '@/components/RoutineGrid';
import Image from 'next/image';

async function getRoutines() {
  const res = await fetch(`http://localhost:3000/api/routines`, {
    cache: 'no-store',
  });
  return res.json();
}

const HomePage = async () => {
  const routines = await getRoutines();
  const routine = routines?.[0] || null;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Class Routine</h1>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="mb-4">
          {/* <Image src="/routine-ref.png" alt="reference" className="max-h-28" /> */}
        </div>
        <RoutineGrid routine={routine} />
      </div>
    </main>
  );
};

export default HomePage;
