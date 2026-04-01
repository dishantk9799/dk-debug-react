import { useState } from "react";
import { useHabit } from "../context/HabitContext";

const HabitItem = ({ habit }) => {
  const { toggleHabit, deleteHabit, updateHabit, getStreak } = useHabit();

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState(habit);

  const today = new Date().toISOString().split("T")[0];
  const isDoneToday = habit.completedDates.includes(today);

   const getPriorityStyles = (priority) => {
    switch (priority) {
      case "Low":
        return "text-green-600 bg-green-50";
      case "High":
        return "text-red-600 bg-red-50";
      case "Medium":
      default:
        return "text-orange-500 bg-orange-50";
    }
  };

  const handleSave = () => {
    updateHabit(habit.id, editData);
    setEditing(false);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm relative group transition-all">
      {editing ? (
    
        <div className="space-y-4 animate-in fade-in zoom-in duration-200">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Edit Habit
          </p>
          
          <input
            className="w-full border border-slate-200 rounded-lg p-3 text-slate-700 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <select 
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-600 text-sm outline-none bg-white"
              value={editData.priority}
              onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>

            <select 
              className="w-full border border-slate-200 rounded-lg p-3 text-slate-600 text-sm outline-none bg-white"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            >
              <option value="Mindset">Mindset</option>
              <option value="Health">Health</option>
              <option value="Focus">Focus</option>
              <option value="Growth">Growth</option>
            </select>
          </div>

          <div className="flex gap-3 pt-2">
            <button 
              onClick={handleSave} 
              className="flex-1 bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-indigo-100"
            >
              Save Changes
            </button>
            <button 
              onClick={() => setEditing(false)} 
              className="px-8 py-3 border border-slate-100 rounded-lg text-slate-400 font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
  
        <>
          <div className="flex justify-between items-start mb-2">
            <div className="flex gap-2">
              <span className="text-[10px] font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                {habit.category}
              </span>
      
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${getPriorityStyles(habit.priority)}`}>
                {habit.priority}
              </span>
            </div>
            
            <div className="text-right">
              <div className="flex items-center justify-end gap-1">
                <span className="text-lg font-semibold text-slate-700">{getStreak(habit.completedDates)}</span>
                <span className="text-orange-400 text-xs font-bold">^^</span>
              </div>
              <p className="text-[9px] font-bold text-slate-300 uppercase tracking-tighter -mt-1">Streak</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className={`text-xl font-bold transition-all ${isDoneToday? 'text-slate-300 line-through' : 'text-slate-700'}`}>
              {habit.name}
            </h3>
            <p className="text-sm text-slate-400 mt-2 italic px-4 border-l-2 border-slate-50">
              {habit.motivation}
            </p>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Goal</p>
              <p className="text-xs font-bold text-slate-500">{habit.goalValue} {habit.unit?.toLowerCase()}</p>
            </div>
            
            <div className="flex items-center gap-5">
              <button onClick={() => setEditing(true)} className="text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors">Edit</button>
              <button onClick={() => deleteHabit(habit.id)} className="text-sm font-semibold text-slate-400 hover:text-red-500 transition-colors">Delete</button>
              <button 
                onClick={() => toggleHabit(habit.id)}
                className={`px-6 py-2 rounded font-bold text-sm transition-all ${
                  isDoneToday
                    ? 'bg-slate-50 text-slate-400 border border-slate-100' 
                    : 'bg-indigo-600 text-white shadow-md hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {isDoneToday? 'Completed' : 'Complete'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HabitItem;