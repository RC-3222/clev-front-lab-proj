import { useEffect, useState } from 'react';
import { ObjectSchema } from 'yup';

export const useErrors = (
  schema: ObjectSchema<any>,
  text: string,
  type: 'password' | 'username'
) => {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const validate = async (val: string) => {
      try {
        const result = await schema.validate(
          {
            [type]: val,
          },
          { abortEarly: false }
        );

        if (result) {
          setErrors([]);
        }
      } catch (e: any) {
        setErrors(e.errors);
      }
    };

    validate(text);
  }, [text, schema, type]);

  return { errorsArr: errors };
};
