import axios from 'axios';

export async function getVerificationRequests() {
  return [
    {
      _id: '1',
      user_id: '6158c2eee888f0728fb18e09',
      img_key: 'b46e16d0-b9b7-47b4-8741-7d808c80ef23.jpg',
      createdAt: '2021-10-03T22:02:28.939+00:00',
    },
    {
      _id: '2',
      user_id: '615dbca77648b83c79897ced',
      img_key: '77f6e33b-fc8c-42fb-9395-3a6ceb2efbf6.JPG',
      createdAt: '2021-10-04T22:02:28.939+00:00',
    },
  ];
}

export async function getUserInfoByID(userID: string) {
  return {
    _id: '3',
    username: 'Mark3',
    first_name: null,
    last_name: null,
    address: null,
    phone_number: null,
    authentication_lvl: 'unverified',
    createdAt: '2021-10-01T18:15:17.249+00:00',
    updatedAt: '2021-10-01T18:15:17.249+00:00',
  };
}
export async function verifyUserByID(
  userId: string,
  approval: boolean,
  token: string
) {
  return axios
    .put(
      'https://pawsup-dev-oznda.ondigitalocean.app/api/v1/users/verification-request',
      {
        user_id: userId,
        approved: approval,
      },
      {
        headers: {
          'auth-token': token,
        },
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        },
      }
    )
    .catch((err) => {
      console.log('Put operation for verification request failed. ' + err);
      throw err;
    });
}

export async function getIDPhotoData(key: string) {
  const resp = {
    data: {
      image:
        'iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAABZVBMVEX//f7///9GgfT+/v7fMDT2wwA3vFD//P////s3u1T8//////n///0zu0n//fxGgfVfwHQitULe+OL1xABFgvLdMDRxnPj///b5wQA1efREe/H3///iMDPd6vhGgPj6wABfkuuq3K9Eg+7aGx3r8vhJfvlaivPy/////+7fHCjq9fZzm/LiMC3ZMDLyxwBHg+rYHizbQUaFqPXE1u+uxfKfuvmfvvbC1PWYrvWNqurU4ve64L+u3rSi37Du++9gkvYevT43c/t9qvLR3/ttlOO7zfVChuagvuhvj+d4m+PC0O5Xg+Z/nOzu3NrkqarfeIHjTlvzqaz46rz23IX60EX+23XafHfjPEfnanH20dHz6uvw1mHqpJ/nipL568bxzi/kurr87bTjDxfudX7yyFDlY2zlrrrz4Jr26pfWjIz99tziua/w0jvI3OHdoaTxWF7y09zZAADzxTDy577TUlnQZGr02ZBzsek0AAAX+ElEQVR4nO1di1/bRtbVSLCanVFH27UcWZIts5JNkLGB8Ax827Bt4jQv3mkJTkgIKc0223a72WT//u/O6IEfshEkJbTV+dEkgG1dH925c+5jXAnlyArpUxvwG0LOVXbkXGVHzlV25FxlR85VduRcZUfOVXbkXGVHzlV25FxlR85VduRcZUfOVXbkXGVHzlV25FxlRypXUohzv9YneNqvfbHux0pKCqIXTPvVKFzq0y7pYt2PlT4+Lviav4YpH3yxrsf9Klz9TpFzlR05V9mRc5UjR44cOXLkyPFxkeur7Mi5yo6cqxw5cuTIkSNHjhw5fq9QNEI0pjCmqp/alCsPTDHjbVhg7FObcrWhaQi+KKbUpOjsh//xwOA/VVIkBWNUqywsLi2tLi0vrlQamE9HMMzEI64g4nkElV2agUxSmck07CzcvGdYlmULWLIxubriYMoUfEULFkgSk0AfY1oie01Gwwpd+8qwZw1vVo6gu7LhWvb9NROr9INt+TWA/u+Lv3H8/YtbH/xaWblSJaQsTFjAjm4YMVWuYbi6DN9b6216Rbn6yz8+/+yzzz/70z/++sGvlYkrVYEwtQZMGeBHui53ISbOmviJYuXq7YroL5/9+U8cn//1cuQNxlrt/pe9JPUCHOzLrxwK1F+xEH/p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',
    },
  };
  return new Promise((res, rej) => {
    setTimeout(() => res(resp), 1000);
  });

  // return axios
  //   .get(
  //     `https://pawsup-dev-oznda.ondigitalocean.app/api/v1/storage/media/${key}`
  //   )
  //   .catch((err) => {
  //     console.log('Get operation for ID photo failed. ' + err);
  //     throw err;
  //   });
}
