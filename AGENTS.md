# AGENTS.md

## Core Behavioral Guidelines

### 1. Think Before Coding
State assumptions explicitly. If multiple interpretations exist, present them. If unclear, ask.

### 2. Simplicity First
Minimum code that solves the problem. No speculative features, abstractions, or error handling for impossible scenarios. If 200 lines could be 50, rewrite it.

### 3. Surgical Changes
Touch only what you must. Don't improve adjacent code or refactor what isn't broken. Remove imports/variables your changes made unused.

### 4. Goal-Driven Execution
Define success criteria. For multi-step tasks, state a brief plan with verification checks.

---

## Clean Architecture

| Layer | Responsibility | Dependencies |
|-------|---------------|--------------|
| **Domain/Entities** | Types, pure transformations | None |
| **Features** | Business scenarios (courses, learning, CRM, analytics, blog) | Entities only |
| **Widgets** | Complex reusable UI (navbar, modals, cards, sections) | Features, Entities |
| **Shared** | UI primitives (`shared/ui/`), utilities (`shared/lib/`) | None |
| **App** | Next.js routing, providers | Any layer |
| **Lib** | Infrastructure (db, auth, redis, supabase) | Any layer |

**Dependency rule**: `app → widgets → features → entities → shared`. No sibling imports between features. Domain imports nothing from outer layers.

** Clean Architecture

| Layer | Responsibility | Dependencies |
|-------|---------------|--------------|
| **Domain/Entities** | Types, pure transformations | None |
| **Features** | Business scenarios (courses, learning, CRM, analytics, blog) | Entities only |
| **Widgets** | Complex reusable UI (navbar, modals, cards, sections) | Features, Entities |
| **Shared** | UI primitives (`shared/ui/`), utilities (`shared/lib/`) | None |
| **App** | Next.js routing, providers | Any layer |
| **Lib** | Infrastructure (db, auth, redis, supabase) | Any layer |

**Dependency rule**: `app → widgets → features → entities → shared`. No sibling imports between features. Domain imports nothing from outer layers.

---

## Coding Standards

### Functions
- Max 3 params; use config objects beyond that
- Max 40 lines (`.ts`), 80 lines (`.tsx`). If exceeded, extract genuinely
- Do one thing: query data or transform it, never both
- No flag params — split into two functions
- Favor `map`/`filter`/`reduce` over imperative loops. No mutations
- `[external] → [pure domain function] → [external]` — side effects only in outer layers

### Naming
- `PascalCase`: types, interfaces, classes, enums
- `camelCase`: variables, functions, instances
- `SNAKE_CASE`: constants
- Names reveal intent. `getCourses()` not `fetchData()`

### No magic values
Replace hardcoded strings/numbers with named constants. Env vars go in `.env.local`.

### Type constraints
No `any`. Domain entities must not import from `@prisma/client`. Validate external data at adapter boundaries (Zod).

### No unsupervised commits
Never `git commit`, `git push`, or `git merge` without explicit human permission.

### Build must pass
Always run `pnpm build` after changes. Fix all errors and warnings.

---

## SOLID + DRY + KISS

| Principle | Rule |
|-----------|------|
| **SRP** | Each component/function has one reason to change |
| **OCP** | Open for extension, closed for modification of existing core |
| **LSP** | Substitute subtypes without changing behavior |
| **ISP** | Don't force consumers to depend on unused methods |
| **DIP** | Depend on abstractions (ports/interfaces), not concretions |
| **DRY** | Duplicate once OK. Three times → extract |
| **KISS** | Simplest solution that works is best |

---

## React Design Principles

1. **Boring code** over clever code — correctness and readability beat elegance
2. **State is traceable** — keep state close to where it's consumed
3. **Composition over configuration** — no global config flags, compose components
4. **Debounce abstraction** — inline first, duplicate once, extract on third occurrence
5. **Escape hatches** exist for a reason — `ref`, `useEffect`, direct DOM are valid tools
6. **Prefer additive changes** — adding code is safer than changing existing code
7. **Optimize for searchability** — use distinct verbose names
8. **Pull, don't push** — let React schedule updates via `setState`, don't force sync
9. **Correctness first, performance second** — no preemptive `useMemo`/`useCallback`
10. **Developer experience matters** — guard clauses, TypeScript types, Zod at boundaries

## React State Management

1. **Never mirror props in state** — derive from props directly
2. **Single source of truth** — exactly one component owns each piece of state
3. **Position in tree determines state lifetime** — use `key` to reset state
4. **Context avoids prop drilling, not complex state** — combine with `useReducer` when needed
5. **Actions describe what happened, reducers handle state changes** — use `useReducer` for complex interrelated state
6. **Avoid redundant state** — if you can calculate it from existing props/state, don't store it
7. **Group related state, flatten deep state** — merge vars that change together, flatten nested objects
8. **`router.refresh()` must follow `await` on mutations** — await the API call before refreshing

## Component Purity

1. Components must be pure functions — same inputs → same JSX
2. Side effects go in event handlers, not during render
3. Local mutation during render is fine (vars/objects created in same render)
4. `StrictMode` catches impurities (double-invocation)
5. Purity enables server rendering and caching

---

## Next.js

### Caching (`use cache` directive)
- `use cache` at function or component level. Arguments/keyword closures become cache key
- Combine with `cacheLife('hours')` for time-based revalidation, `cacheTag('posts')` for `updateTag()` invalidation
- PPR (Partial prerendering default): static shell + dynamic content streamed at request time
- Runtime APIs (`cookies`, `headers`, `searchParams`) require `<Suspense>` wrapper
- `connection()` defers non-deterministic ops (e.g. `Date.now()`) to request time
- Legacy `revalidate = 60` still works but `use cache` + `cacheLife` is finer-grained

### Navigation
- `<Link>` prefetches, `<a>` does not — always use `<Link>` for internal navigation
- Every dynamic route needs `loading.tsx` (auto-wraps page in `<Suspense>`)
- `generateStaticParams` makes dynamic routes prerenderable
- `useLinkStatus` for slow-network feedback
- Prefetch control: `prefetch={false}` for performance-sensitive lists

### Route Handlers
- `route.ts` cannot coexist with `page.ts` at same segment
- Only GET is cacheable (opt-in with `force-static`)
- `use cache` in route handlers requires extracting to a helper function
- Prerendering stops at runtime data access to runtime data (request.url, cookies, etc.)
- Use `RouteContext` helper for typed params

---

## Supabase

When doing Supabase work (Database, Auth, Storage, schema changes, RLS, migrations), read `C:\Users\vmthe\.agents\skills\supabase\SKILL.md` and follow it.

**Migration workflow**: Stop dev server before `prisma migrate deploy`. Use direct connection (port 5432), not pooler (6543). If hangs, apply SQL manually in Supabase SQL Editor and mark it applied. Prisma 7 uses `@prisma/adapter-pg`. Project is ESM — use `.mjs`/`.cjs` configs.

---

## Design Constraints

- **Flat design**: no shadows, no gradients, no blur
- **Primary**: `#99001C` (crimson) — CTAs and active states only, never backgrounds
- **Fonts**: Montserrat headings (`font-headline`), Be Vietnam Pro body (`font-body`)
- **Radius**: `rounded-sm` (4px) for buttons/inputs, `rounded-card` (3.75px / 8px) for cards
- **Max width**: 1140px (`max-w-content`)
- **Spacing base**: 7.5px unit (15px gutters, 30px sections, 50px footer)
- **Never**: `rounded-full`, shadows, gradients

---

## Database & Scalability

### Clean Database Design
1. Normalize at rest (3NF for OLTP), denormalize only for read performance
2. One table, one entity — no super-tables with nullable columns
3. Loosely couple tables — add relationships only when a use case demands it
4. Use truly unique surrogate keys (CUIDs), never business data as PK
5. Prefer soft deletes (`deletedAt`) for audit trails
6. Maintain history for regulatory compliance (`AuditLog` with `beforeState`/`afterState`)
7. Consistent naming: `SNAKE_CASE` in SQL, full English words, positive boolean assertions
8. Fit schema to workload — OLTP normalized, OLAP can use materialized views
9. Schema refactoring is first-class — each migration has clear purpose, never mutate committed migrations

### Scalability Principles
1. Partition before scaling vertically — shard by natural key matching primary access pattern
2. Replicate for read scale, not write scale — replicas absorb reads, primary handles writes
3. Cache the hot path, not everything — explicit TTLs, good candidates: metadata, categories, slugs
4. Load balance at the right layer — keep API routes stateless
5. Denormalize what you read more than you write — store pre-computed counters (totalLessons, etc.)
6. Strong consistency for payments, eventual consistency for progress tracking
7. Query shape over query count — single well-indexed query > 3 smaller or 1 over-fetching
8. Avoid N+1: batch queries instead of per-item lookups