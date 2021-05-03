import { GravityFormsForm } from "../generated/graphql";
import getGravityForm from "../utilities/gravity-forms";
import GravityForm from '../components/GravityForm';

interface Props {
  form: GravityFormsForm;
}

export default function Questionnaire({ form }: Props) {
  const { title, description } = form;

  return (
    <main>
      <h1>{title}</h1>
      <p>{description}</p>
      <GravityForm form={form} />
    </main>
  );
}

export async function getStaticProps() {
  const form = await getGravityForm(3);

  return {
    props: { form },
  };
}
