import { GravityFormsForm } from "../generated/graphql";
import getGravityForm from "../utilities/gravity-forms";
import GravityForm from '../components/GravityForm';

interface Props {
  form: GravityFormsForm;
}

export default function Questionnaire({ form }: Props) {
  return (
    <>
      <h1>Questionnaire</h1>
      <p>Please let us know how we can help.</p>
      <GravityForm form={form} />
    </>
  );
}

export async function getStaticProps() {
  const form = await getGravityForm(1);

  return {
    props: { form },
  };
}
