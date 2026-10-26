'use client';
export default function ThemeButton(){return <button className="theme" onClick={()=>document.documentElement.classList.toggle('dark')}>◐ <span>Toggle appearance</span></button>}
