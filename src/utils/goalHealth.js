/**
 * Compute a simple "health" indicator for a goal based on:
 *   - progress so far (completed tasks / total tasks)
 *   - time elapsed since creation vs total time until due date
 *
 * Returns:
 *   { label: 'On track' | 'At risk' | 'Behind' | 'Done' | 'No deadline',
 *     tone: 'emerald' | 'amber' | 'red' | 'slate',
 *     reason: string }
 */
export const goalHealth = (goal) => {
  const milestoneTasks = (goal?.milestones || []).flatMap(
    (m) => m.tasks || []
  );
  const total = milestoneTasks.length;
  const completed = milestoneTasks.filter((t) => t.status === 'completed')
    .length;
  const pct = total ? completed / total : 0;

  if (goal?.status === 'Completed' || (total > 0 && completed === total)) {
    return { label: 'Done', tone: 'emerald', reason: 'All tasks completed.' };
  }

  if (!goal?.dueDate) {
    return {
      label: total === 0 ? 'No tasks' : 'No deadline',
      tone: 'slate',
      reason:
        total === 0
          ? 'Add milestones and tasks to track progress.'
          : 'Add a due date to enable risk tracking.',
    };
  }

  const created = goal.createdAt ? new Date(goal.createdAt).getTime() : Date.now();
  const due = new Date(goal.dueDate).getTime();
  const now = Date.now();

  if (due <= created) {
    return {
      label: 'Check dates',
      tone: 'amber',
      reason: 'Due date is before creation date — review.',
    };
  }

  const elapsed = (now - created) / (due - created);

  // Past due
  if (now > due) {
    if (pct >= 1) {
      return { label: 'Done', tone: 'emerald', reason: 'Completed.' };
    }
    return {
      label: 'Overdue',
      tone: 'red',
      reason: `Past due with ${Math.round(pct * 100)}% done.`,
    };
  }

  // Pace: progress vs time
  // If you've used 80% of your time and only done 20%, you're behind.
  const drift = elapsed - pct;

  if (drift > 0.35) {
    return {
      label: 'Behind',
      tone: 'red',
      reason: `Time spent ${Math.round(elapsed * 100)}% but only ${Math.round(
        pct * 100
      )}% done.`,
    };
  }
  if (drift > 0.15) {
    return {
      label: 'At risk',
      tone: 'amber',
      reason: `Progress trailing time by ${Math.round(drift * 100)}%.`,
    };
  }
  return {
    label: 'On track',
    tone: 'emerald',
    reason: `${Math.round(pct * 100)}% done, ${Math.round(
      elapsed * 100
    )}% of time used.`,
  };
};

const TONE_CLASSES = {
  emerald:
    'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-200/60 dark:ring-emerald-800/60',
  amber:
    'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200/60 dark:ring-amber-800/60',
  red: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 ring-1 ring-red-200/60 dark:ring-red-800/60',
  slate:
    'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 ring-1 ring-slate-200/60 dark:ring-slate-700/60',
};

export const healthToneClass = (tone) =>
  TONE_CLASSES[tone] || TONE_CLASSES.slate;
