-- Run after 001-reactions.sql against the intended Neon branch.
-- Safe to rerun: an existing writing is enabled without changing its reactions.
INSERT INTO public.reaction_posts (post_id)
VALUES ('/writings/un-cafe-por-favor')
ON CONFLICT (post_id)
DO UPDATE SET enabled = true;
