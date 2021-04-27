import { GetStaticPropsContext } from "next";

import { client } from "../services/apollo";
import GravityFormsForm, { GET_FORM } from '../components/GravityFormsForm';

interface Props {
  name: string;
  form: any;
}

export default function Questionnaire({ form }: Props) {
  return (
    <>
      <h1>Questionnaire</h1>
      <GravityFormsForm form={form} />
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const result = await client
    .query({
      query: GET_FORM,
      variables: { formId: 1 },
    });

  const form = result?.data?.gravityFormsForm || null;

  return {
    props: { form },
  };
}
