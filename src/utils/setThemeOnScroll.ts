export const setThemeOnScroll = (newTheme: string) => {
  const newScrollTrackColor = newTheme === 'dark' ? '#202c36' : '#81bdea'
  const newScrollThumbColor = newTheme === 'dark' ? '#2a3944' : '#4380b9'
  const newScrollThumbHoverColor = newTheme === 'dark' ? '#1d7779' : '#439db9'

  const customStyle = `
      ::-webkit-scrollbar-track {
        background-color: ${newScrollTrackColor};
      }

      ::-webkit-scrollbar-thumb {
        background-color: ${newScrollThumbColor};
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background-color: ${newScrollThumbHoverColor};
      }
    `
  const styleElement = document.createElement('style')
  styleElement.innerHTML = customStyle
  document.head.appendChild(styleElement)
}
