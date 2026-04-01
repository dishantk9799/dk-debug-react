import { useHabit } from "../context/HabitContext";
import HabitItem from "./HabitItem";

const HabitList = () => {
  const { habits, showAll, setShowAll } = useHabit();
  const today = new Date().toISOString().split("T")[0];

  if (habits.length === 0) {
    return null;
  }
  const total = habits.length;
  const completedToday = habits.filter((h) => h.completedDates.includes(today)).length;
  const highPriorityCount = habits.filter((h) => h.priority === "High").length;

  const progressPercent = Math.round((completedToday / habits.length) * 100);

  const topCategory =
    habits.reduce((acc, h) => {
      acc[h.category] = (acc[h.category] || 0) + 1;
      return acc;
    }, {});

  const mainFocus = Object.keys(topCategory).reduce((a, b) =>
    topCategory[a] > topCategory[b] ? a : b,
  );



  const visibleHabits = showAll ? habits : habits.slice(0, 3);

  return (
    <div className="space-y-8 max-w-xl mx-auto">
      <div className="bg-white border border-slate-100 rounded-xl p-7 shadow-sm">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Daily Progress</p>
            <h2 className="text-2xl font-semibold text-slate-800">
              {completedToday === total ? "All caught up!" : "Keep going"}
            </h2>
          </div>
          <div className="text-slate-500 font-medium text-sm pt-4">
            {completedToday} / {total}
          </div>
        </div>

        <div className="w-full bg-slate-50 h-2 rounded-full overflow-hidden mb-8">
          <div
            className="bg-indigo-600 h-full transition-all duration-500"
            style={{ width: `${(completedToday / total) * 100}%` }}
          />
        </div>

        <div className="grid grid-cols-2 pt-6 border-t border-slate-50">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Focus</p>
            <p className="text-sm font-semibold text-slate-700">{mainFocus}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Priority</p>
            <p className="text-sm font-semibold text-slate-700">{highPriorityCount} High Tasks</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">
          Your Routine
        </h3>

        <div className="space-y-6">
          {visibleHabits.map((habit) => (
            <HabitItem key={habit.id} habit={habit} />
          ))}
        </div>

        {habits.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-6 py-2 text-sm text-slate-400 font-bold hover:text-indigo-600 transition-colors uppercase tracking-widest"
          >
            {showAll ? "↑ Show Less" : `↓ Show All (${habits.length})`}
          </button>
        )}
      </div>
    </div>
  );
};

export default HabitList;