import DialogItem from '../DialogItem/DialogItem';
import styles from './DialogList.module.css';

export default function DialogList({dialogs}) {
    return (
        <div className={styles.list}>
            {dialogs.map(dialog => (
                <DialogItem
                    key={dialog.id}
                    id={dialog.id}
                    name={dialog.name}
                />
            ))}
        </div>
    );
}
