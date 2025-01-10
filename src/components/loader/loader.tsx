import Loader from "react-js-loader";
import styles from './loader.module.css'

export default function AppLoader() {
    return (
        <div className={styles.loader_overlay}>
            <div className={styles.loader}>
                <Loader type="spinner-default" bgColor={'white'} color={'white'} size={50}/>
            </div>
        </div>
    )
}