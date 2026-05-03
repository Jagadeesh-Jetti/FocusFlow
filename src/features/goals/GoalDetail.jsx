import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, Plus } from 'lucide-react';
import { Sidebar } from '../../components/Sidebar';
import { Modal } from '../../components/Modal';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import {
  deleteGoalById,
  getGoalFull,
  updateGoalById,
} from './goalThunk';
import { clearGoalDetail, patchDetailTask } from './goalSlice';
import { GoalForm } from './goalComponents/GoalForm';
import { MilestoneSection } from './goalComponents/MilestoneSection';
import { TaskRow } from './goalComponents/TaskRow';
import {
  createMilestone,
  deleteMilestoneById,
  updateMilestoneById,
} from '../milestones/milestoneThunk';
import {
  createTask,
  deleteTaskById,
  updateTaskById,
} from '../tasks/taskThunk';

const statusColor = {
  'Not Started': 'bg-gray-100 text-gray-700',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-green-100 text-green-700',
};

const priorityColor = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-red-100 text-red-700',
};

export const GoalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { goalDetail, unassignedTasks, detailLoading, error } = useSelector(
    (state) => state.goal
  );

  const [showEdit, setShowEdit] = useState(false);
  const [showAddMilestone, setShowAddMilestone] = useState(false);
  const [showAddOrphanTask, setShowAddOrphanTask] = useState(false);
  const [confirm, setConfirm] = useState(null); // { title, message, onConfirm }
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    category: '',
    status: '',
    priority: '',
    dueDate: '',
  });
  const [milestoneForm, setMilestoneForm] = useState({
    title: '',
    description: '',
    targetDate: '',
  });
  const [orphanTaskForm, setOrphanTaskForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
  });

  useEffect(() => {
    if (id) {
      dispatch(getGoalFull(id));
    }
    return () => {
      dispatch(clearGoalDetail());
    };
  }, [dispatch, id]);

  const refresh = () => dispatch(getGoalFull(id));

  const progress = useMemo(() => {
    if (!goalDetail) return { completed: 0, total: 0, pct: 0 };
    const milestoneTasks = (goalDetail.milestones || []).flatMap(
      (m) => m.tasks || []
    );
    const allTasks = [...milestoneTasks, ...unassignedTasks];
    const total = allTasks.length;
    const completed = allTasks.filter((t) => t.status === 'completed').length;
    const pct = total ? Math.round((completed / total) * 100) : 0;
    return { completed, total, pct };
  }, [goalDetail, unassignedTasks]);

  const openEdit = () => {
    if (!goalDetail) return;
    setEditForm({
      title: goalDetail.title || '',
      description: goalDetail.description || '',
      category: goalDetail.category || '',
      status: goalDetail.status || 'Not Started',
      priority: goalDetail.priority || 'Medium',
      dueDate: goalDetail.dueDate || '',
    });
    setShowEdit(true);
  };

  const submitEdit = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      updateGoalById({ id, updatedData: editForm })
    );
    if (updateGoalById.fulfilled.match(res)) {
      setShowEdit(false);
      refresh();
    }
  };

  const handleDeleteGoal = () => {
    setConfirm({
      title: 'Delete this goal?',
      message:
        'This will permanently remove the goal. Its milestones and tasks will become unassigned.',
      confirmLabel: 'Delete goal',
      destructive: true,
      onConfirm: async () => {
        setConfirm(null);
        const res = await dispatch(deleteGoalById(id));
        if (deleteGoalById.fulfilled.match(res)) navigate('/goals');
      },
    });
  };

  const handleAddMilestone = async (e) => {
    e.preventDefault();
    if (
      !milestoneForm.title.trim() ||
      !milestoneForm.description.trim() ||
      !milestoneForm.targetDate
    ) {
      return;
    }
    const res = await dispatch(
      createMilestone({ ...milestoneForm, goal: id })
    );
    if (createMilestone.fulfilled.match(res)) {
      const newMilestoneId = res.payload.milestone?._id;
      if (newMilestoneId && goalDetail) {
        const nextIds = [
          ...(goalDetail.milestones || []).map((m) => m._id),
          newMilestoneId,
        ];
        await dispatch(
          updateGoalById({ id, updatedData: { milestones: nextIds } })
        );
      }
      setMilestoneForm({ title: '', description: '', targetDate: '' });
      setShowAddMilestone(false);
      refresh();
    }
  };

  const handleEditMilestone = async (milestoneId, updates) => {
    const res = await dispatch(
      updateMilestoneById({ id: milestoneId, updatedData: updates })
    );
    if (updateMilestoneById.fulfilled.match(res)) refresh();
  };

  const handleDeleteMilestone = (milestoneId) => {
    setConfirm({
      title: 'Delete this milestone?',
      message: 'Tasks under it will become unassigned, not deleted.',
      confirmLabel: 'Delete milestone',
      destructive: true,
      onConfirm: async () => {
        setConfirm(null);
        const res = await dispatch(deleteMilestoneById(milestoneId));
        if (deleteMilestoneById.fulfilled.match(res)) refresh();
      },
    });
  };

  const handleAddTaskToMilestone = async (milestoneId, form) => {
    const res = await dispatch(
      createTask({
        ...form,
        goal: id,
        milestone: milestoneId,
      })
    );
    if (createTask.fulfilled.match(res)) refresh();
  };

  const handleAddOrphanTask = async (e) => {
    e.preventDefault();
    if (
      !orphanTaskForm.title.trim() ||
      !orphanTaskForm.description.trim() ||
      !orphanTaskForm.dueDate
    ) {
      return;
    }
    const res = await dispatch(
      createTask({
        ...orphanTaskForm,
        goal: id,
      })
    );
    if (createTask.fulfilled.match(res)) {
      setOrphanTaskForm({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
      });
      setShowAddOrphanTask(false);
      refresh();
    }
  };

  const handleToggleTask = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    const prevStatus = task.status;

    dispatch(
      patchDetailTask({
        _id: task._id,
        status: nextStatus,
        completedAt: nextStatus === 'completed' ? new Date().toISOString() : null,
      })
    );

    const res = await dispatch(
      updateTaskById({
        id: task._id,
        updatedTask: { status: nextStatus },
      })
    );

    if (!updateTaskById.fulfilled.match(res)) {
      dispatch(
        patchDetailTask({
          _id: task._id,
          status: prevStatus,
          completedAt: task.completedAt,
        })
      );
    }
  };

  const handleDeleteTask = (taskId) => {
    setConfirm({
      title: 'Delete this task?',
      message: 'This action cannot be undone.',
      confirmLabel: 'Delete task',
      destructive: true,
      onConfirm: async () => {
        setConfirm(null);
        const res = await dispatch(deleteTaskById(taskId));
        if (deleteTaskById.fulfilled.match(res)) refresh();
      },
    });
  };

  const handleUpdateTask = async (taskId, updates) => {
    const res = await dispatch(
      updateTaskById({ id: taskId, updatedTask: updates })
    );
    if (updateTaskById.fulfilled.match(res)) refresh();
  };

  if (detailLoading && !goalDetail) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="text-gray-500">Loading goal…</div>
        </main>
      </div>
    );
  }

  if (!goalDetail) {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">
          <button
            onClick={() => navigate('/goals')}
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-4"
          >
            <ArrowLeft className="w-4 h-4" /> Back to goals
          </button>
          <div className="text-gray-600">
            {error
              ? `Couldn't load this goal: ${error}`
              : 'Goal not found. It may have been deleted.'}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate('/goals')}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to goals
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 break-words">
                {goalDetail.title}
              </h1>
              {goalDetail.category && (
                <div className="text-sm text-gray-500 mt-1">
                  {goalDetail.category}
                </div>
              )}
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={openEdit}
                aria-label="Edit goal"
                className="p-2 text-gray-600 hover:text-indigo-600 rounded-lg hover:bg-gray-100"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={handleDeleteGoal}
                aria-label="Delete goal"
                className="p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {goalDetail.description && (
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">
              {goalDetail.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
            {goalDetail.status && (
              <span
                className={`px-2 py-1 rounded-full font-medium ${
                  statusColor[goalDetail.status] || 'bg-gray-100 text-gray-700'
                }`}
              >
                {goalDetail.status}
              </span>
            )}
            {goalDetail.priority && (
              <span
                className={`px-2 py-1 rounded-full font-medium ${
                  priorityColor[goalDetail.priority] ||
                  'bg-gray-100 text-gray-700'
                }`}
              >
                {goalDetail.priority} priority
              </span>
            )}
            {goalDetail.dueDate && (
              <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                Due {new Date(goalDetail.dueDate).toLocaleDateString('en-GB')}
              </span>
            )}
          </div>

          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>
                {progress.completed} / {progress.total} tasks · {progress.pct}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${progress.pct}%` }}
              />
            </div>
          </div>
        </div>

        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">Milestones</h2>
            <button
              onClick={() => setShowAddMilestone((v) => !v)}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4" /> Add milestone
            </button>
          </div>

          {showAddMilestone && (
            <form
              onSubmit={handleAddMilestone}
              className="mb-3 border border-indigo-200 bg-indigo-50/50 rounded-xl p-4 space-y-2"
            >
              <input
                autoFocus
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Milestone title"
                value={milestoneForm.title}
                onChange={(e) =>
                  setMilestoneForm({ ...milestoneForm, title: e.target.value })
                }
                required
              />
              <textarea
                className="w-full px-2 py-1 border rounded text-sm"
                rows={2}
                placeholder="Description"
                value={milestoneForm.description}
                onChange={(e) =>
                  setMilestoneForm({
                    ...milestoneForm,
                    description: e.target.value,
                  })
                }
                required
              />
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  className="px-2 py-1 border rounded text-sm"
                  value={milestoneForm.targetDate}
                  onChange={(e) =>
                    setMilestoneForm({
                      ...milestoneForm,
                      targetDate: e.target.value,
                    })
                  }
                  required
                />
                <button
                  type="submit"
                  className="ml-auto bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddMilestone(false)}
                  className="bg-gray-200 px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {goalDetail.milestones?.length ? (
            <div className="space-y-3">
              {goalDetail.milestones.map((m) => (
                <MilestoneSection
                  key={m._id}
                  milestone={m}
                  onEditMilestone={handleEditMilestone}
                  onDeleteMilestone={handleDeleteMilestone}
                  onAddTask={handleAddTaskToMilestone}
                  onToggleTask={handleToggleTask}
                  onDeleteTask={handleDeleteTask}
                  onUpdateTask={handleUpdateTask}
                />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-500 text-sm">
              No milestones yet. Break your goal into steps above.
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-800">
              Unassigned tasks
            </h2>
            <button
              onClick={() => setShowAddOrphanTask((v) => !v)}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Plus className="w-4 h-4" /> Add task
            </button>
          </div>

          {showAddOrphanTask && (
            <form
              onSubmit={handleAddOrphanTask}
              className="mb-3 border border-indigo-200 bg-indigo-50/50 rounded-xl p-4 space-y-2"
            >
              <input
                autoFocus
                className="w-full px-2 py-1 border rounded text-sm"
                placeholder="Task title"
                value={orphanTaskForm.title}
                onChange={(e) =>
                  setOrphanTaskForm({
                    ...orphanTaskForm,
                    title: e.target.value,
                  })
                }
                required
              />
              <textarea
                className="w-full px-2 py-1 border rounded text-sm"
                rows={2}
                placeholder="Description"
                value={orphanTaskForm.description}
                onChange={(e) =>
                  setOrphanTaskForm({
                    ...orphanTaskForm,
                    description: e.target.value,
                  })
                }
                required
              />
              <div className="flex gap-2 items-center">
                <input
                  type="date"
                  className="px-2 py-1 border rounded text-sm"
                  value={orphanTaskForm.dueDate}
                  onChange={(e) =>
                    setOrphanTaskForm({
                      ...orphanTaskForm,
                      dueDate: e.target.value,
                    })
                  }
                  required
                />
                <select
                  className="px-2 py-1 border rounded text-sm"
                  value={orphanTaskForm.priority}
                  onChange={(e) =>
                    setOrphanTaskForm({
                      ...orphanTaskForm,
                      priority: e.target.value,
                    })
                  }
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <button
                  type="submit"
                  className="ml-auto bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddOrphanTask(false)}
                  className="bg-gray-200 px-3 py-1 rounded text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {unassignedTasks.length ? (
            <div className="bg-white rounded-xl border border-gray-200 p-3 space-y-1">
              {unassignedTasks.map((task) => (
                <TaskRow
                  key={task._id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                  onUpdate={handleUpdateTask}
                />
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-400 italic px-3 py-2">
              No unassigned tasks.
            </div>
          )}
        </section>

        <Modal
          isOpen={showEdit}
          onClose={() => setShowEdit(false)}
          title="Edit goal"
        >
          <GoalForm
            handleSubmit={submitEdit}
            form={editForm}
            setForm={setEditForm}
            loading={false}
            isSaved={false}
            aiPlan={null}
            hideAI
            generateWithAI={() => {}}
            saveAIPlan={() => {}}
          />
        </Modal>

        <ConfirmDialog
          isOpen={!!confirm}
          title={confirm?.title}
          message={confirm?.message}
          confirmLabel={confirm?.confirmLabel}
          destructive={confirm?.destructive}
          onConfirm={confirm?.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      </main>
    </div>
  );
};
