import { NextResponse } from 'next/server';

import connect from '@/lib/mongoose';
import Routine from '@/models/Routine';

export const GET = async () => {
  await connect();

  const routines = await Routine.find().lean();

  return NextResponse.json(routines);
};

export const POST = async req => {
  await connect();

  const body = await req.json();
  const r = new Routine(body);
  await r.save();

  return NextResponse.json(r);
};

export const PUT = async req => {
  await connect();

  const body = await req.json();
  if (!body._id)
    return NextResponse.json({ error: 'Missing _id' }, { status: 400 });

  const updated = await Routine.findByIdAndUpdate(body._id, body, {
    new: true,
  }).lean();

  return NextResponse.json(updated);
};

export const DELETE = async () => {
  await connect();

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });

  await Routine.findByIdAndDelete(id);

  return NextResponse.json({ ok: true });
};
