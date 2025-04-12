import React from 'react'
import ChatView from '../../../../components/custom/ChatView'
import CodeView from '../../../../components/custom/CodeView'

const Workspace = () => {
  return (
  <div className='p-10 h-screen'>
    <div className='flex flex-col md:flex-row gap-6 h-full'>
      {/*Left:Chat View */}
      <div className='w-full md:w-1/3 bg-black text-white p-4 rounded shadow overflow-y-auto'>
        <ChatView/>
      </div>

      {/*Right: Code View */}
      <div className='w-full md:w-2/3 bg-black text-white p-4 rounded shadow overflow-y-auto'>
        <CodeView/>
      </div>
    </div>
  </div> 
  );
};

export default Workspace