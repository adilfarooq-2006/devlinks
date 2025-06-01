// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';
// import { getUser } from '@/actions/useractions';

// export async function GET(req) {
//   const cookieStore = await cookies();
//   const token = cookieStore.get('token');

//   if (!token) {
//     return NextResponse.json({ message: 'No token found' }, { status: 401 });
//   }

//   try {
//     const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
//     const user = await getUser(decoded.email);
//     console.log('user', user);

//     if (!user) {
//       return NextResponse.json({ message: 'User not found' }, { status: 404 });
//     }
//     console.log('user', user.username);
    
//     // Return a consistent response with all necessary user data
//     return NextResponse.json({
//       username: user.username,
//       email: user.email,
//       fullname: user.fullname
//     }, { status: 200 });
//   }
//   catch (error) {
//     return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
//   }
// }