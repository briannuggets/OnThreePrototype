uniform float uTime;
uniform float uSize;

attribute float aSpeed;
attribute float aScale;

void main()
{
    float posY = position.y + uTime * aSpeed / 2.0;
    float posZ = position.z + uTime * aSpeed;

    vec4 modelPosition = modelMatrix * vec4(position.x, posY, posZ, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;

    // Size attenuation
    // gl_PointSize *= (1.0 / - viewPosition.z);
}