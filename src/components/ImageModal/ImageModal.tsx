import { Dispatch, Fragment, } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { Dialog, Transition } from '@headlessui/react'
import ImageForm from '../ImageForm/ImageForm'
import styles from './ImageModal.module.css';

type ImageModalProps = {
    modal: boolean,
    setModal: Dispatch<React.SetStateAction<boolean>>
}


export default function ImageModal({ modal, setModal }: ImageModalProps) {

    return (
        <>
            <div className={styles['image-modal__button-container']}>
                <button
                    type="button"
                    onClick={() => setModal(true)}
                    className={styles['image-modal__button']}
                >
                    <PlusCircleIcon className={styles['image-modal__icon']} />
                </button>
            </div>

            <Transition appear show={modal} as={Fragment}>
                <Dialog as="div" className={styles['image-modal__dialog']} onClose={() => setModal(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter={styles['image-modal__transition-enter']}
                        enterFrom={styles['image-modal__transition-enter-from']}
                        enterTo={styles['image-modal__transition-enter-to']}
                        leave={styles['image-modal__transition-leave']}
                        leaveFrom={styles['image-modal__transition-leave-from']}
                        leaveTo={styles['image-modal__transition-leave-to']}
                    >
                        <div className={styles['image-modal__backdrop']} />
                    </Transition.Child>

                    <div className={styles['image-modal__container']}>
                        <div className={styles['image-modal__content']}>
                            <Transition.Child
                                as={Fragment}
                                enter={styles['image-modal__panel-enter']}
                                enterFrom={styles['image-modal__panel-enter-from']}
                                enterTo={styles['image-modal__panel-enter-to']}
                                leave={styles['image-modal__panel-leave']}
                                leaveFrom={styles['image-modal__panel-leave-from']}
                                leaveTo={styles['image-modal__panel-leave-to']}
                            >
                                <Dialog.Panel className={styles['image-modal__panel']}>
                                    <ImageForm />
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}