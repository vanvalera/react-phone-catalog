import classNames from 'classnames';
import styles from './productCardHome.module.scss';
import { handleAddToCart } from '../../app/services/handleAddCartItem';
import { handleAddToFavorites } from '../../app/services/functions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

export interface ProductCardHomeProps {
  category: string;
  itemId: string;
  id: string | number;
  image: string;
  name: string;
  price: number;
  fullPrice: number;
  screen: string;
  capacity: string;
  ram: string;
  onClick?: () => void;
  isNew?: boolean;
}

export const ProductCardHome: React.FC<ProductCardHomeProps> = ({
  category,
  itemId,
  id,
  image,
  name,
  price,
  fullPrice,
  screen,
  capacity,
  ram,
  onClick,
  isNew,
}) => {
  const dispatch = useDispatch();
  const favoritesProducts = useSelector(
    (state: RootState) => state.favorite.items,
  );
  const cartProducts = useSelector((state: RootState) => state.cart.items);

  const isInCart = cartProducts.some(
    product =>
      (product.itemId && product.itemId === itemId) ||
      (product.itemId && product.itemId === id) ||
      (product.id && product.id === id) ||
      (product.id && product.id === itemId),
  );

  const isFavorite = favoritesProducts.some(
    product =>
      (product.itemId && product.itemId === itemId) ||
      (product.itemId && product.itemId === id) ||
      (product.id && product.id === id) ||
      (product.id && product.id === itemId),
  );

  const handleFavoriteClick = () => {
    handleAddToFavorites(
      id,
      itemId,
      image,
      name,
      price,
      fullPrice,
      screen,
      capacity,
      ram,
      category,
      favoritesProducts,
      dispatch,
    );
  };

  const handleCartClick = () => {
    handleAddToCart(
      id,
      itemId,
      image,
      name,
      price,
      category,
      1,
      cartProducts,
      dispatch,
    );
  };

  return (
    <div className={styles.phones_cart} key={itemId}>
      <img
        src={image}
        alt="phone"
        className={styles.phones_img}
        onClick={onClick}
      />
      <p className={styles.phones_name}>{name}</p>
      <div className={`${styles.phones_priceC} flex`}>
        <p className={styles.phones_priceD}>${price}</p>
        {isNew ? <p className={styles.phones_priceR}>${fullPrice}</p> : null}
      </div>

      <p className={styles.phones_screen}>
        Screen <span>{screen.split(' ').slice(0, 2).join(' ')}</span>
      </p>
      <p className={styles.phones_capacity}>
        Capacity <span>{capacity}</span>
      </p>
      <p className={styles.phones_ram}>
        RAM <span>{ram}</span>
      </p>
      <div className={styles.phones_buttonDiv}>
        <button
          className={classNames(styles.phones_buttonBuy, {
            [styles.buyed]: isInCart,
          })}
          onClick={handleCartClick}
        >
          {isInCart ? 'Added to cart' : 'Add to cart'}
        </button>
        <button className={styles.phones_favor} onClick={handleFavoriteClick}>
          <span
            className={classNames(
              isFavorite ? styles.filled_heart : styles.phones_favor_icon,
            )}
          ></span>
        </button>
      </div>
    </div>
  );
};