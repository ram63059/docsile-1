import React, { useState } from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'Job Interview' | 'Conference' | 'Mentor Session' | 'Anniversary' | 'Event' | 'Post Schedule';
  location?: string;
}

const EventCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'Day' | 'Month' | 'Year'>('Month');
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Job Interview',
      date: new Date(2025, 0, 29),
      time: '4:00PM',
      type: 'Job Interview',
      location: 'Bhaskararama Hospital & Research Institute'
    },
    {
      id: '2',
      title: 'Conference',
      date: new Date(2025, 0, 2),
      time: '1:00PM',
      type: 'Conference',
      location: 'India Ophthalmology Forum: Advancing Eye...'
    }
  ]);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({});

  const eventColors = {
    'Job Interview': 'bg-red-100 text-red-800',
    'Conference': 'bg-green-100 text-green-800',
    'Mentor Session': 'bg-purple-100 text-purple-800',
    'Anniversary': 'bg-pink-100 text-pink-800',
    'Event': 'bg-blue-100 text-blue-800',
    'Post Schedule': 'bg-orange-100 text-orange-800'
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const getEventsForDay = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.date && newEvent.time && newEvent.type) {
      setEvents([...events, { id: Date.now().toString(), ...newEvent } as Event]);
      setShowAddEvent(false);
      setNewEvent({});
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setSelectedView('Day')}
              className={`px-3 py-1 rounded ${
                selectedView === 'Day' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setSelectedView('Month')}
              className={`px-3 py-1 rounded ${
                selectedView === 'Month' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setSelectedView('Year')}
              className={`px-3 py-1 rounded ${
                selectedView === 'Year' ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              Year
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <FaChevronRight />
          </button>
          <button
            onClick={() => setShowAddEvent(true)}
            className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            <FaPlus />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'].map(day => (
          <div key={day} className="text-center font-semibold py-2">
            {day}
          </div>
        ))}
        {daysInMonth.map((day, index) => (
          <div
            key={index}
            className={`min-h-[120px] p-2 border ${
              !isSameMonth(day, currentDate)
                ? 'bg-gray-50'
                : isToday(day)
                ? 'bg-blue-50'
                : 'bg-white'
            }`}
          >
            <div className="text-right mb-2">
              {format(day, 'd')}
            </div>
            <div className="space-y-1">
              {getEventsForDay(day).map(event => (
                <div
                  key={event.id}
                  className={`${eventColors[event.type]} p-1 rounded text-sm`}
                >
                  <div className="font-semibold">{event.title}</div>
                  <div className="text-xs">{event.time}</div>
                  {event.location && (
                    <div className="text-xs truncate">{event.location}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showAddEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Event</h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={newEvent.title || ''}
                  onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  onChange={e => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
                />
              </div>
              <div>
                <label className="block mb-1">Time</label>
                <input
                  type="time"
                  className="w-full border rounded p-2"
                  onChange={e => setNewEvent({ ...newEvent, time: e.target.value })}
                />
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <select
                  className="w-full border rounded p-2"
                  value={newEvent.type || ''}
                  onChange={e => setNewEvent({ ...newEvent, type: e.target.value as Event['type'] })}
                >
                  <option value="">Select type</option>
                  <option value="Job Interview">Job Interview</option>
                  <option value="Conference">Conference</option>
                  <option value="Mentor Session">Mentor Session</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Event">Event</option>
                  <option value="Post Schedule">Post Schedule</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Location (optional)</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={newEvent.location || ''}
                  onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
                />
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddEvent}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Event
                </button>
                <button
                  onClick={() => {
                    setShowAddEvent(false);
                    setNewEvent({});
                  }}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
