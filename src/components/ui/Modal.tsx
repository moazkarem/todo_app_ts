import { Dialog, Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'

interface Iprops{
  isOpen:boolean ,
  setIsOpen:(val:boolean)=>void ,
  children:ReactNode ,
  closeModal:()=>void ,
  title:string

}
const  Modal = ({children , isOpen , closeModal ,title}:Iprops)=> {
  

 

  return (
    <>
  

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
              <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
           
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-indigo-700"
                  >
                   {title}
                  </Dialog.Title>
                  <div className="mt-2">
                   {children}
                  </div>

                 
                </Dialog.Panel> 
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default Modal