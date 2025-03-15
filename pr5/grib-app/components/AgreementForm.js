'use client';
import {useSelector, useDispatch} from 'react-redux';
import {setAccepted} from '../store/agreementSlice';

const AgreementForm = () => {
    const isAccepted = useSelector((state) => state.agreement.isAccepted);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Соглашение принято!');
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border rounded">
            <div className="mb-4">
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isAccepted}
                        onChange={(e) => dispatch(setAccepted(e.target.checked))}
                        className="form-checkbox"
                    />
                    <span>Я принимаю условия соглашения</span>
                </label>
            </div>
            <button
                type="submit"
                disabled={!isAccepted}
                className={`w-full px-4 py-2 rounded ${
                    isAccepted
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
                Подтвердить
            </button>
        </form>
    );
};

export default AgreementForm;
