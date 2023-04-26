import { ChangeEvent, FormEvent, Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks';
import { addReviewAction } from '../../store/api-actions';

// pages
import NotFoundPage from '../../pages/not-found-page/not-found-page';

const MIN_SYMBOLS_QUANTITY = 50;
const MAX_SYMBOLS_QUANTITY = 400;

export default function CommentForm(): JSX.Element {
  const dispatch = useAppDispatch();
  const starCount = 10;
  const ratingStars = [...Array(starCount).keys()];
  const [formData, setFormData] = useState({
    starId: 0,
    text: '',
  });
  const [error, setError] = useState('Fill out the form');
  const [isHasText, setIsHasText] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const blurHandler = () => setIsHasText(true);

  useEffect(() => {
    if (formData.starId === 0 && error) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [error, formData.starId]);

  const { id } = useParams();

  if (!id) {
    return <NotFoundPage />;
  }

  const onChange = ({
    target,
  }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [target.name]: target.value });
    if (
      target.value.length < MIN_SYMBOLS_QUANTITY ||
      target.value.length > MAX_SYMBOLS_QUANTITY
    ) {
      setError(
        `The form must contain a minimum of ${MIN_SYMBOLS_QUANTITY} characters and a maximum of ${MAX_SYMBOLS_QUANTITY}`
      );
      if (!target.value) {
        setError('Fill out the form');
      }
    } else {
      setError('');
    }
    if (!formData.starId) {
      setError('add stars');
    }
  };

  const onSubmitHandler = () => {
    dispatch(
      addReviewAction({
        rating: Number(formData.starId),
        comment: formData.text,
        filmId: id,
      })
    );
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    onSubmitHandler();
  };
  return (
    <div className='add-review'>
      <form
        action='#'
        className='add-review__form'
        onSubmit={formSubmitHandler}
      >
        <div className='rating'>
          <div className='rating__stars'>
            {ratingStars.map((ratingStar) => (
              <Fragment key={ratingStar}>
                <input
                  onBlur={blurHandler}
                  onChange={onChange}
                  className='rating__input'
                  id={`star-${starCount - ratingStar}`}
                  type='radio'
                  name='starId'
                  value={starCount - ratingStar}
                />
                <label
                  className='rating__label'
                  htmlFor={`star-${starCount - ratingStar}`}
                >
                  Rating {starCount - ratingStar}
                </label>
              </Fragment>
            ))}
          </div>
        </div>

        <div
          className='add-review__text'
          style={{ backgroundColor: 'rgba(200, 200, 200, 0.4)' }}
        >
          <textarea
            className='add-review__textarea'
            name='text'
            id='review-text'
            value={formData.text}
            placeholder='Review text'
            onChange={onChange}
            onBlur={blurHandler}
          />
          <div className='add-review__submit'>
            <button
              className='add-review__btn'
              type='submit'
              disabled={!isValid}
            >
              Post
            </button>
          </div>
        </div>
      </form>
      {isHasText && error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}
