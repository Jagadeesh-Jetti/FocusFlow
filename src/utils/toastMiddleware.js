import { toast } from 'sonner';

const SUCCESS_MESSAGES = {
  'auth/login': 'Welcome back',
  'auth/register': 'Account created',
  'goal/create': 'Goal created',
  'goal/updatedById': 'Goal updated',
  'goal/deleteById': 'Goal deleted',
  'task/create': 'Task created',
  'task/updateById': 'Task updated',
  'task/deleteById': 'Task deleted',
  'milestone/create': 'Milestone created',
  'milestone/updateById': 'Milestone updated',
  'milestone/deleteById': 'Milestone deleted',
  'post/create': 'Post shared',
  'post/comment': 'Comment added',
  'post/toggleLike': null,
  'post/delete': 'Post deleted',
  'users/follow': 'Followed',
  'users/unfollow': 'Unfollowed',
  'users/update': 'Profile updated',
};

const DEFAULT_ERROR = 'Something went wrong';
const NETWORK_ERROR = 'Server unreachable. Is the backend running?';

const NETWORK_HINTS = ['Network Error', 'ERR_NETWORK', 'Failed to fetch'];

const isNetworkError = (action) => {
  const errMsg = action.error?.message || '';
  const payloadStr = typeof action.payload === 'string' ? action.payload : '';
  return NETWORK_HINTS.some(
    (hint) => errMsg.includes(hint) || payloadStr.includes(hint)
  );
};

const messageFor = (action) => {
  if (isNetworkError(action)) return NETWORK_ERROR;
  const { payload, error } = action;
  if (typeof payload === 'string' && payload) return payload;
  if (payload?.message) return payload.message;
  if (error?.message) return error.message;
  return DEFAULT_ERROR;
};

export const toastMiddleware = () => (next) => (action) => {
  const type = action.type || '';

  if (type.endsWith('/fulfilled')) {
    const prefix = type.slice(0, -'/fulfilled'.length);
    if (prefix in SUCCESS_MESSAGES) {
      const msg = SUCCESS_MESSAGES[prefix];
      if (msg) toast.success(msg);
    }
  } else if (type.endsWith('/rejected')) {
    toast.error(messageFor(action));
  }

  return next(action);
};
