import { ChangeEvent, FormEvent, useState } from 'react';

function ReviewForm(): JSX.Element {
  const starCount = 10;
  const ratingStars = [...Array(starCount) as [number]];

  const [formData, setFormData] = useState({
    'rating': '',
    'text': ''
  });

  const onChange = ({ target }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form action='#' className='add-review__form' onSubmit={formSubmitHandler}>
      <div className='rating'>
        <div className='rating__stars'>
          {ratingStars.map((_, index) => (
            <>
              <input
                onChange={onChange}
                className='rating__input'
                id={`star-${starCount - index}`}
                type='radio'
                name='rating'
                value={starCount - index}
              />
              <label className='rating__label' htmlFor={`star-${starCount - index}`}>
                Rating {starCount - index}
              </label>
            </>
          ))}

        </div>
      </div>

      <div className='add-review__text'>
        <textarea onChange={onChange} className='add-review__textarea' name='review-text' id='review-text' placeholder='Review text'></textarea>
        <div className='add-review__submit'>
          <button className='add-review__btn' type='submit'>
            Post
          </button>
        </div>
      </div>
    </form>
  );
}

export default ReviewForm;
