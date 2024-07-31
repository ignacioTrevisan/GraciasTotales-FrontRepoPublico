import { useDispatch, useSelector } from "react-redux"
import { closeLoadModal, closeModal, closeQuery, closeSidebar, isModalCreating, isModalEditing, openLoadModal, openModal, openQuery, openSidebar } from "../../store/ui/uiSlice";

export const UseUiStore = () => {
    const dispatch = useDispatch();
    const { modalOpen, modalEditing, sidebarOpen, queryOpen, onLoadModal } = useSelector(state => state.ui);

    const isEditing = () => {
        dispatch(isModalEditing())
    }
    const isNotEditing = () => {
        dispatch(isModalCreating())
    }
    const onModalOpen = () => {
        dispatch(openModal())
    }
    const onModalClose = () => {
        dispatch(closeModal())
    }

    const onSidebarOpen = () => {
        dispatch(openSidebar())
    }
    const onSidebarClose = () => {
        dispatch(closeSidebar())
    }


    const onQueryrOpen = () => {
        dispatch(openQuery())
    }
    const onQueryClose = () => {
        dispatch(closeQuery())
    }
    const onLoadModalOpen = () => {
        dispatch(openLoadModal())
    }
    const onLoadModalclose = () => {
        dispatch(closeLoadModal())
    }
    return {
        isNotEditing,
        isEditing,
        onModalOpen,
        onSidebarOpen,
        onSidebarClose,
        onModalClose,
        onQueryrOpen,
        onQueryClose,
        onLoadModalOpen,
        onLoadModalclose,
        modalOpen,
        modalEditing,
        sidebarOpen,
        queryOpen,
        onLoadModal
    }
}