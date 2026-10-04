CREATE TABLE IF NOT EXISTS public.reaction_posts (
    post_id text PRIMARY KEY,
    enabled boolean NOT NULL DEFAULT true,
    CHECK (char_length(post_id) BETWEEN 1 AND 300)
);

CREATE TABLE IF NOT EXISTS public.writing_reactions (
    post_id text NOT NULL
        REFERENCES public.reaction_posts(post_id),
    visitor_id uuid NOT NULL,
    reaction text NOT NULL CHECK (reaction IN (
        'like', 'celebrate', 'hype', 'love',
        'applaud', 'admire', 'boost', 'smile'
    )),
    created_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (post_id, visitor_id, reaction)
);

CREATE INDEX IF NOT EXISTS writing_reactions_totals_idx
    ON public.writing_reactions (post_id, reaction);

CREATE TABLE IF NOT EXISTS public.reaction_request_limits (
    visitor_id uuid PRIMARY KEY,
    window_start timestamptz NOT NULL,
    requests integer NOT NULL
);
