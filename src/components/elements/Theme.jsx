export function Theme() {
  function toggleSwitchOn() {
    const toggleBtn = document.querySelector('input[type=checkbox]');
    if (toggleBtn.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
  return (
    <div className='mode'>
      <input
        type='checkbox'
        name='switch'
        id='switch'
        onClick={toggleSwitchOn}
      />
      <label htmlFor='switch'>
        <span className='material-symbols-outlined icon'>light_mode</span>
        <span className='material-symbols-outlined'>dark_mode</span>
      </label>
    </div>
  );
}
