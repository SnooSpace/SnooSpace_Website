'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Upload, Calendar, Clock, MapPin, Lock, RefreshCw, Minus, Plus, Globe, Users as UsersIcon, CheckCircle2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export interface ActivityOption {
  id: string;
  label: string;
  emoji: string;
  illustration: string;
  defaultPlan: string;
  placeholder: string;
}

export const ACTIVITIES: ActivityOption[] = [
  { id: 'shopping', label: 'Shopping', emoji: '🛍️', illustration: '/illustrations/Shopping.webp', defaultPlan: 'Shopping date? 🛍️', placeholder: 'e.g. Thrift shopping & boba date? 🛍️' },
  { id: 'sports', label: 'Sports', emoji: '🏀', illustration: '/illustrations/Sports.webp', defaultPlan: 'Pickup Basketball & Drinks 🏀', placeholder: 'e.g. 3v3 Basketball pickup game 🏀' },
  { id: 'food', label: 'Food', emoji: '🍜', illustration: '/illustrations/Food.webp', defaultPlan: 'Ramen & Noodle Tasting 🍜', placeholder: 'e.g. Late night ramen & gyoza 🍜' },
  { id: 'cafe', label: 'Cafe', emoji: '☕', illustration: '/illustrations/Cafe.webp', defaultPlan: 'Specialty Espresso Hangout ☕', placeholder: 'e.g. Specialty espresso & reading session ☕' },
  { id: 'bar', label: 'Bar', emoji: '🍸', illustration: '/illustrations/Bar.webp', defaultPlan: 'Craft Cocktail & Brew Social 🍸', placeholder: 'e.g. Speakeasy cocktails & vinyl music 🍸' },
  { id: 'movies', label: 'Movies', emoji: '🎬', illustration: '/illustrations/Movie.webp', defaultPlan: 'Indie Film & Rooftop Cinema 🎬', placeholder: 'e.g. Rooftop indie movie screening 🎬' },
  { id: 'music', label: 'Live Music', emoji: '🎵', illustration: '/illustrations/Music.webp', defaultPlan: 'Acoustic Jam & Open Mic 🎵', placeholder: 'e.g. Acoustic jam session in the park 🎵' },
  { id: 'games', label: 'Games', emoji: '🎮', illustration: '/illustrations/Gaming.webp', defaultPlan: 'Smash & Catan Game Night 🎮', placeholder: 'e.g. Smash Bros & Catan board game night 🎮' },
  { id: 'gym', label: 'Gym', emoji: '💪', illustration: '/illustrations/Gym.webp', defaultPlan: 'Morning Workout & Protein Shake 💪', placeholder: 'e.g. Heavy leg day & smoothie session 💪' },
  { id: 'yoga', label: 'Yoga', emoji: '🧘', illustration: '/illustrations/Yoga.webp', defaultPlan: 'Park Yoga & Mindfulness 🧘', placeholder: 'e.g. Sunset mindfulness & outdoor yoga 🧘' },
  { id: 'walk', label: 'Walk', emoji: '🚶', illustration: '/illustrations/walk.webp', defaultPlan: 'Sunset City Stroll 🚶', placeholder: 'e.g. Evening waterfront walk & chat 🚶' },
  { id: 'rides', label: 'Rides', emoji: '🏍️', illustration: '/illustrations/ride.webp', defaultPlan: 'Scenic Trail Ride 🏍️', placeholder: 'e.g. Highway coast motorcycle ride 🏍️' },
  { id: 'hangout', label: 'Hangout', emoji: '🌳', illustration: '/illustrations/Hangout.webp', defaultPlan: 'Rooftop Chill & Drinks 🌳', placeholder: 'e.g. Sunset rooftop chill & conversation 🌳' },
  { id: 'creative', label: 'Creative', emoji: '🎨', illustration: '/illustrations/Creative.webp', defaultPlan: 'Pottery & Painting Session 🎨', placeholder: 'e.g. Pottery painting & sip session 🎨' },
  { id: 'study', label: 'Study / Co-work', emoji: '📚', illustration: '/illustrations/Co-work_Study.webp', defaultPlan: 'Quiet Focus & Coffee Session 📚', placeholder: 'e.g. Silent focus & co-working at cafe 📚' },
  { id: 'pet', label: 'Pet Friendly', emoji: '🐾', illustration: '/illustrations/Pet_Friendly.webp', defaultPlan: 'Dog Park Meetup & Walk 🐾', placeholder: 'e.g. Dog park playdate & walk 🐾' },
  { id: 'houseparty', label: 'House Party', emoji: '🏡', illustration: '/illustrations/HouseParty.webp', defaultPlan: 'Board Games & Snacks House Party 🏡', placeholder: 'e.g. Board games & snacks house party 🏡' },
  { id: 'club', label: 'Club', emoji: '🪩', illustration: '/illustrations/Party.webp', defaultPlan: 'Weekend Dance & DJ Night 🪩', placeholder: 'e.g. Weekend techno & DJ night 🪩' },
  { id: 'hiking', label: 'Hiking', emoji: '🥾', illustration: '/illustrations/Hiking.webp', defaultPlan: 'Sunrise Ridge Trail Hike 🥾', placeholder: 'e.g. Sunrise mountain trail hike 🥾' },
  { id: 'other', label: 'Other...', emoji: '✨', illustration: '/illustrations/Other.webp', defaultPlan: 'Spontaneous City Hangout ✨', placeholder: 'e.g. Spontaneous city hangout ✨' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const SHORT_MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

export interface HostPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (plan: {
    activity: ActivityOption;
    title: string;
    location: string;
    spots: number;
    cost?: string;
  }) => void;
}

export function HostPlanModal({ isOpen, onClose, onPublish }: HostPlanModalProps) {
  // Pre-select 'Shopping' by default as requested
  const [selectedActivity, setSelectedActivity] = useState<ActivityOption | null>(ACTIVITIES[0]);
  const [planTitle, setPlanTitle] = useState('');
  const [costOption, setCostOption] = useState<'free' | 'self' | 'split' | 'entry' | null>(null);
  const [priceAmount, setPriceAmount] = useState('');
  const [visibility, setVisibility] = useState<'everyone' | 'members' | null>(null);
  const [genderPref, setGenderPref] = useState<'everyone' | 'women' | 'men' | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [maxSpots, setMaxSpots] = useState(3);
  const [location, setLocation] = useState('');
  const [repeatWeekly, setRepeatWeekly] = useState(false);

  const [showToast, setShowToast] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  // Explicit Year & Month States for Calendar Navigation
  const [viewYear, setViewYear] = useState<number>(new Date().getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

  // In-App Time Wheel State
  const [tempHour, setTempHour] = useState<number>(12);
  const [tempMinute, setTempMinute] = useState<number>(30);
  const [tempAmPm, setTempAmPm] = useState<'AM' | 'PM'>('PM');

  // Sync user's PC local time on mount / open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const now = new Date();
      setViewYear(now.getFullYear());
      setViewMonth(now.getMonth());
      setSelectedDay(now.getDate());

      let h = now.getHours() % 12;
      if (h === 0) h = 12;
      setTempHour(h);
      setTempMinute(now.getMinutes());
      setTempAmPm(now.getHours() >= 12 ? 'PM' : 'AM');
    } else {
      document.body.style.overflow = '';
      setIsDatePickerOpen(false);
      setIsTimePickerOpen(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSelectActivity = (act: ActivityOption) => {
    setSelectedActivity(act);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const activeAct = selectedActivity || ACTIVITIES[0];
    const finalTitle = planTitle || activeAct.defaultPlan;
    const finalLocation = location || 'Indiranagar';

    let costString = costOption === 'free' ? 'Free' : costOption === 'self' ? 'Self-pay' : '';
    if (costOption === 'split' || costOption === 'entry') {
      costString = priceAmount ? `₹${priceAmount} (${costOption})` : costOption;
    }

    // 1. Instantly publish plan to cluster
    onPublish({
      activity: activeAct,
      title: finalTitle,
      location: finalLocation,
      spots: maxSpots,
      cost: costString,
    });

    // 2. Close modal
    onClose();

    // 3. Show sleek floating green toast notification
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  // Calendar Calculation Helpers
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = today.getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const handleHourWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY > 0) {
      setTempHour((prev) => (prev === 12 ? 1 : prev + 1));
    } else {
      setTempHour((prev) => (prev === 1 ? 12 : prev - 1));
    }
  };

  const handleMinuteWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    if (e.deltaY > 0) {
      setTempMinute((prev) => (prev + 1) % 60);
    } else {
      setTempMinute((prev) => (prev - 1 + 60) % 60);
    }
  };

  if (!isOpen && !showToast) return null;

  return (
    <>
      {/* SLEEK FLOATING GREEN TOAST NOTIFICATION BANNER */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] max-w-md w-[90%] bg-emerald-600 text-white rounded-2xl p-4 shadow-2xl shadow-emerald-600/40 border border-emerald-400/30 flex items-center gap-3.5 animate-in slide-in-from-top-6 duration-300 pointer-events-auto">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-extrabold text-white font-sans tracking-tight">
              Open Plan Published! 🚀
            </h4>
            <p className="text-xs font-semibold text-emerald-100 truncate">
              Open Plan Posted!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowToast(false)}
            className="p-1.5 rounded-xl hover:bg-white/15 text-emerald-100 hover:text-white cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* FORM MODAL OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto overscroll-contain"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Modal Card Container */}
          <div
            className="relative w-full max-w-lg bg-white rounded-[32px] shadow-2xl border border-slate-100 max-h-[85vh] flex flex-col my-auto overflow-hidden text-[#0F172A]"
            onClick={(e) => e.stopPropagation()}
          >

        {/* IN-APP EXACT DATE PICKER SHEET */}
        {isDatePickerOpen && (
          <div className="absolute inset-0 z-40 bg-white rounded-[32px] p-6 flex flex-col justify-between animate-in slide-in-from-bottom-full duration-300 overflow-y-auto">
            <div>
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-2" />

              <button
                type="button"
                onClick={() => setIsDatePickerOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-extrabold text-center text-[#0F172A] mb-4 font-sans">
                Select date
              </h3>

              <div className="flex items-center justify-between px-4 mb-6">
                <button
                  type="button"
                  onClick={handlePrevMonth}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <div className="text-center">
                  <span className="text-base font-extrabold text-[#0F172A] block">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleNextMonth}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-xs font-semibold text-slate-400 mb-3">
                <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
              </div>

              <div className="grid grid-cols-7 text-center text-sm font-medium gap-y-3">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`offset-${i}`} />
                ))}
                
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => {
                  const isToday = viewYear === todayYear && viewMonth === todayMonth && d === todayDate;
                  const isSelected = selectedDay === d;
                  const isPast = new Date(viewYear, viewMonth, d) < new Date(todayYear, todayMonth, todayDate);

                  return (
                    <button
                      key={d}
                      type="button"
                      disabled={isPast}
                      onClick={() => setSelectedDay(d)}
                      className={`w-9 h-9 rounded-full mx-auto flex items-center justify-center text-sm transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#3565F2] text-white font-extrabold shadow-md shadow-[#3565F2]/30'
                          : isToday
                          ? 'border-2 border-[#3565F2] text-[#3565F2] font-bold'
                          : isPast
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-[#0F172A] hover:bg-slate-100 font-semibold'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const shortMonth = SHORT_MONTH_NAMES[viewMonth];
                setSelectedDate(`${selectedDay} ${shortMonth} ${viewYear}`);
                setIsDatePickerOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-[#3565F2] text-white font-extrabold text-sm shadow-lg shadow-[#3565F2]/30 hover:bg-[#3D79F2] cursor-pointer transition-all mt-4"
            >
              Confirm Date
            </button>
          </div>
        )}

        {/* IN-APP EXACT TIME PICKER SHEET */}
        {isTimePickerOpen && (
          <div className="absolute inset-0 z-40 bg-white rounded-[32px] p-6 flex flex-col justify-between animate-in slide-in-from-bottom-full duration-300 overflow-y-auto">
            <div>
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-2" />

              <button
                type="button"
                onClick={() => setIsTimePickerOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-xl font-extrabold text-center text-[#0F172A] mb-6 font-sans">
                Select Time
              </h3>

              <div className="relative w-full py-6 rounded-2xl bg-[#F8FAFC] border border-slate-100 flex items-center justify-center my-4 overflow-hidden">
                <div className="absolute inset-x-3 top-1/2 -translate-y-1/2 h-12 rounded-xl bg-[#F2F7FE] border border-[#3565F2]/30 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-center gap-8 w-full px-6 select-none">
                  {/* Hour Column */}
                  <div
                    onWheel={handleHourWheel}
                    className="flex flex-col items-center gap-1 cursor-ns-resize py-1"
                  >
                    <button
                      type="button"
                      onClick={() => setTempHour(tempHour === 1 ? 12 : tempHour - 1)}
                      className="text-xs font-semibold text-slate-300 hover:text-slate-600 cursor-pointer transition-colors"
                    >
                      {tempHour === 1 ? 12 : tempHour - 1}
                    </button>
                    <span className="text-2xl font-extrabold text-[#0F172A] py-1">{tempHour}</span>
                    <button
                      type="button"
                      onClick={() => setTempHour(tempHour === 12 ? 1 : tempHour + 1)}
                      className="text-xs font-semibold text-slate-300 hover:text-slate-600 cursor-pointer transition-colors"
                    >
                      {tempHour === 12 ? 1 : tempHour + 1}
                    </button>
                  </div>

                  <span className="text-2xl font-bold text-slate-400">:</span>

                  {/* Minute Column */}
                  <div
                    onWheel={handleMinuteWheel}
                    className="flex flex-col items-center gap-1 cursor-ns-resize py-1"
                  >
                    <button
                      type="button"
                      onClick={() => setTempMinute((tempMinute - 1 + 60) % 60)}
                      className="text-xs font-semibold text-slate-300 hover:text-slate-600 cursor-pointer transition-colors"
                    >
                      {String((tempMinute - 1 + 60) % 60).padStart(2, '0')}
                    </button>
                    <span className="text-2xl font-extrabold text-[#0F172A] py-1">
                      {String(tempMinute).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTempMinute((tempMinute + 1) % 60)}
                      className="text-xs font-semibold text-slate-300 hover:text-slate-600 cursor-pointer transition-colors"
                    >
                      {String((tempMinute + 1) % 60).padStart(2, '0')}
                    </button>
                  </div>

                  {/* AM/PM Toggle Column */}
                  <div
                    onWheel={(e) => {
                      e.stopPropagation();
                      if (e.deltaY > 0 && tempAmPm === 'AM') {
                        setTempAmPm('PM');
                      } else if (e.deltaY < 0 && tempAmPm === 'PM') {
                        setTempAmPm('AM');
                      }
                    }}
                    className="flex flex-col items-center justify-center gap-1.5 cursor-ns-resize py-1 select-none min-w-[40px]"
                  >
                    <button
                      type="button"
                      onClick={() => setTempAmPm('AM')}
                      className={`text-xs font-semibold cursor-pointer transition-colors ${
                        tempAmPm === 'PM' ? 'text-slate-300 hover:text-slate-600' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      AM
                    </button>
                    <span className="text-2xl font-extrabold text-[#3565F2] py-1 cursor-pointer">
                      {tempAmPm}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTempAmPm('PM')}
                      className={`text-xs font-semibold cursor-pointer transition-colors ${
                        tempAmPm === 'AM' ? 'text-slate-300 hover:text-slate-600' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      PM
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-medium text-slate-400 text-center">
                Scroll mouse wheel or tap numbers to adjust time
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSelectedTime(`${tempHour}:${String(tempMinute).padStart(2, '0')} ${tempAmPm}`);
                setIsTimePickerOpen(false);
              }}
              className="w-full py-4 rounded-2xl bg-[#3565F2] text-white font-extrabold text-sm shadow-lg shadow-[#3565F2]/30 hover:bg-[#3D79F2] cursor-pointer transition-all mt-4"
            >
              Confirm Time
            </button>
          </div>
        )}

        {/* Top Handle Bar */}
        <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 shrink-0" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight font-sans">
            Host an open plan
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          onSubmit={handleSubmit}
          onWheel={(e) => e.stopPropagation()}
          className="p-6 space-y-6 overflow-y-auto min-h-0 flex-1 overscroll-contain text-[#0F172A] scrollbar-thin scrollbar-thumb-slate-300"
        >
          {/* 1. Activity Type Choice */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Activity type
            </label>
            <div className="flex flex-wrap gap-2 p-0.5">
              {ACTIVITIES.map((act) => {
                const isSelected = selectedActivity?.id === act.id;
                return (
                  <button
                    key={act.id}
                    type="button"
                    onClick={() => handleSelectActivity(act)}
                    className={`px-3.5 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-[#F2F7FE] text-[#3565F2] border-[#3565F2] shadow-sm ring-2 ring-[#3565F2]/20'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>{act.emoji}</span>
                    <span>{act.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Banner Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Banner
            </label>
            <div className="relative w-full h-44 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 flex items-center justify-center text-center">
              {selectedActivity ? (
                <>
                  <Image
                    src={selectedActivity.illustration}
                    alt={selectedActivity.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover object-center transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </>
              ) : (
                <div className="p-4 text-slate-400 text-xs font-semibold flex flex-col items-center gap-1">
                  <Sparkles className="w-6 h-6 text-[#3565F2]/60 mb-1" />
                  <span>Select an activity type above to view banner illustration</span>
                </div>
              )}
            </div>
          </div>

          {/* 3. What's the plan? Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              What&apos;s the plan?
            </label>
            <input
              type="text"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              placeholder={selectedActivity?.placeholder || "e.g. Thrift shopping & boba date? 🛍️"}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-semibold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#3565F2]/40 focus:bg-white transition-all"
            />
          </div>

          {/* 4. Cost Options */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Cost
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'free', label: 'Free' },
                { id: 'self', label: 'Self-pay' },
                { id: 'split', label: 'We split' },
                { id: 'entry', label: 'Entry fee' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCostOption(opt.id as any)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-all ${
                    costOption === opt.id
                      ? 'bg-[#F2F7FE] text-[#3565F2] border-[#3565F2]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Price Input Box for 'We Split' or 'Entry Fee' */}
            {(costOption === 'split' || costOption === 'entry') && (
              <div className="mt-3 flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 animate-in fade-in duration-200">
                <span className="text-sm font-extrabold text-[#3565F2]">₹</span>
                <input
                  type="number"
                  value={priceAmount}
                  onChange={(e) => setPriceAmount(e.target.value)}
                  placeholder={costOption === 'split' ? 'e.g. 200 (approx split per person)' : 'e.g. 150 (entry ticket)'}
                  className="w-full bg-transparent text-xs font-bold text-[#0F172A] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
              </div>
            )}
          </div>

          {/* 5. Who can discover this? */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Who can discover this?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setVisibility('everyone')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  visibility === 'everyone'
                    ? 'bg-[#F2F7FE] border-[#3565F2] ring-1 ring-[#3565F2]'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <Globe className={`w-5 h-5 mb-1 ${visibility === 'everyone' ? 'text-[#3565F2]' : 'text-slate-500'}`} />
                <h4 className="text-xs font-bold text-[#0F172A]">Everyone</h4>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5">Visible to all SnooSpace users</p>
              </button>

              <button
                type="button"
                onClick={() => setVisibility('members')}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  visibility === 'members'
                    ? 'bg-[#F2F7FE] border-[#3565F2] ring-1 ring-[#3565F2]'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <UsersIcon className={`w-5 h-5 mb-1 ${visibility === 'members' ? 'text-[#3565F2]' : 'text-slate-500'}`} />
                <h4 className="text-xs font-bold text-[#0F172A]">Community members</h4>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5">People who share a community with you</p>
              </button>
            </div>
          </div>

          {/* 6. Gender Preference */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Gender preference
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setGenderPref('everyone')}
                className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-all ${
                  genderPref === 'everyone'
                    ? 'bg-[#F2F7FE] text-[#3565F2] border-[#3565F2]'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                Everyone
              </button>
              <button
                type="button"
                onClick={() => setGenderPref('women')}
                className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-all ${
                  genderPref === 'women'
                    ? 'bg-pink-50 text-pink-600 border-pink-500 ring-2 ring-pink-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ♀ Women only
              </button>
              <button
                type="button"
                onClick={() => setGenderPref('men')}
                className={`px-4 py-2 rounded-full text-xs font-bold border cursor-pointer transition-all ${
                  genderPref === 'men'
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                ♂ Men only
              </button>
            </div>
          </div>

          {/* 7. When & Max Spots */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">When</label>
              <button
                type="button"
                onClick={() => setIsDatePickerOpen(true)}
                className={`w-full p-3 rounded-2xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                  selectedDate
                    ? 'bg-[#F2F7FE] text-[#3565F2] border-[#3565F2]'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{selectedDate || 'Select date'}</span>
                </div>
              </button>
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">&nbsp;</label>
              <button
                type="button"
                onClick={() => setIsTimePickerOpen(true)}
                className={`w-full p-3 rounded-2xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                  selectedTime
                    ? 'bg-[#F2F7FE] text-[#3565F2] border-[#3565F2]'
                    : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{selectedTime || 'Select time'}</span>
                </div>
              </button>
            </div>

            <div className="col-span-1">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Max spots</label>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMaxSpots(Math.max(1, maxSpots - 1))}
                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-sm font-extrabold">{maxSpots}</span>
                <button
                  type="button"
                  onClick={() => setMaxSpots(maxSpots + 1)}
                  className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* 8. General Area (Public) */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              General area (public)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Enter a general neighborhood or public area (e.g. Indiranagar, Soho, Downtown)"
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#3565F2]/40 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* 9. Exact Meetup Point (Greyed Out / In-App Only Note) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                Exact meetup point (only approved attendees see this)
              </label>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-100/70 border border-dashed border-slate-300 flex items-center justify-between text-xs font-semibold opacity-60 pointer-events-none cursor-not-allowed">
              <div className="flex items-center gap-2 text-slate-500">
                <Lock className="w-4 h-4 text-slate-400" />
                <span>Exact location pinning is available In-App</span>
              </div>
              <span className="text-xs font-bold text-slate-400">Locked</span>
            </div>
          </div>

          {/* 10. Repeat Weekly Switch */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-[#3565F2]" />
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">Repeat weekly</h4>
                <p className="text-[10px] font-medium text-slate-500">Auto-post the same plan every week</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setRepeatWeekly(!repeatWeekly)}
              className={`w-11 h-6 rounded-full p-1 transition-colors cursor-pointer ${
                repeatWeekly ? 'bg-[#3565F2]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  repeatWeekly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-[#3565F2] text-white font-extrabold text-sm shadow-lg shadow-[#3565F2]/30 hover:bg-[#3D79F2] active:scale-[0.99] cursor-pointer transition-all"
          >
            Post Open Plan 🎉
          </button>
        </form>
      </div>
    </div>
  )}
</>
  );
}
