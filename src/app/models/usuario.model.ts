/**
 * Modelo para el objeto Usuario
 */
export class Usuario {
  /**
   * Constructor del Usuario
   * @param name Nombre
   * @param email Correo
   * @param password Contraseña
   * @param img Imagen
   * @param role Rol
   * @param google Registrado con google
   * @param _id Identificador
   */
  constructor(
    public sub: string,
    /**
     * Nombre del usuario
     */
    public name: string,
    /**
     * Correo del usuario
     */
    public email: string,
    /**
     * Contraseña del usuario
     */
    public password: string,
    /**
     * Tema del usuario
     */
    public theme?: string,
    /**
     * Imagen de perfil
     */
    public img?: string,
    /**
     * Role del usuario
     */
    public role?: string,
    /**
     * Registrado con google
     */
    public google?: boolean,
    /**
     * Identificador del usuario
     */
    public _id?: string,
  ) {}
}
