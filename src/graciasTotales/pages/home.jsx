
import { ProductContainer } from '../components/ProductContainer'
import { UseUiStore } from '../hooks/useUiStore'
import { ProductModal } from '../ui/productModal';

export const Home = () => {
    const { modalOpen } = UseUiStore();

    return (
        <div>
            <ProductModal />
            <ProductContainer />
        </div>
    )
}
