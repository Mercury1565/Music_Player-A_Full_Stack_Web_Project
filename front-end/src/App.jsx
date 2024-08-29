import { Global } from '@emotion/react';
import { globalStyles } from './styles/global_styles';

import Sidebar from './components/sidebar';

function App() {
  return (
    <>
      <Global styles={globalStyles} />
      <Sidebar />
    </>
  )
}

export default App