import { useForm } from "react-hook-form";
import { useHabit } from "../context/HabitContext";

const HabitForm = () => {
  const { addHabit } = useHabit();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { goalValue: 30, unit: "Minutes", startDate: "2026-04-01", category: "Mindset", priority: "Medium" }
  });

  const onCommit = (values) => {
    addHabit(values);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onCommit)} className="space-y-1">
      <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Habit Name</label>
      <input
        {...register("name", { required: "Please enter a name" })}
        placeholder="e.g. Morning Exercise"
        className={`w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all ${errors.name ? 'border-red-300' : ''}`}
      />
      {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Daily Goal</label>
          <input type="number" {...register("goalValue")} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Unit</label>
          <select {...register("unit")} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all">
            <option>Minutes</option><option>Pages</option><option>Reps</option><option>Liters</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Start Date</label>
          <input type="date" {...register("startDate")} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all" />
        </div>
        <div className="flex-1">
          <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Category</label>
          <select {...register("category")} className="w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all">
            <option>Health</option><option>Focus</option><option>Growth</option><option>Mindset</option>
          </select>
        </div>
      </div>

      <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Motivation</label>
      <textarea
        {...register("motivation")}
        placeholder="Why is this important to you?"
        className={`w-full border border-slate-200 rounded-lg p-2.5 text-sm text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all h-20 resize-none`}
      />

      <label className="block text-xs font-semibold text-slate-600 mb-1 mt-4">Priority Level</label>
      <div className="flex gap-6 mb-8 pt-1">
        {["Low", "Medium", "High"].map(level => (
          <label key={level} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
            <input type="radio" value={level} {...register("priority")} className="w-4 h-4 accent-indigo-600" />
            {level}
          </label>
        ))}
      </div>

      <button type="submit" className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
        Create Habit
      </button>
    </form>
  );
};

export default HabitForm;