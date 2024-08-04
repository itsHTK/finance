import { clerkMiddleware, getAuth } from '@hono/clerk-auth';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';
import { z } from 'zod';

import accounts from './accounts';

export const runtime = 'edge';

const app = new Hono().basePath('/api');

const routes = app.route('/accounts', accounts);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
